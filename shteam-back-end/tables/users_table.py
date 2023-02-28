from flask_jwt_extended import get_jwt_identity
from tinydb import Query
from errors import EmailAlreadyExists, GameDoesNotExist, IllegalAccess, UserDoesNotExist, UsernameAlreadyExists
from helpers import list_append, store_image
from setup import db
from werkzeug.datastructures import FileStorage
from tinydb import operations

from tables.games_table import GamesTable

class UsersTable:
    __table = db.table('users')

    def contains_username(username: str) -> bool:
        return UsersTable.__table.contains(Query().username == username)

    def contains_id(user_id: int) -> bool:
        return UsersTable.__table.contains(doc_id=user_id)
    
    def contains_email(email: str) -> bool:
        return UsersTable.__table.contains(Query().email == email)

    def add(username: str, email: str, password: str, image: FileStorage | str) -> int:
        if UsersTable.contains_username(username):
            raise UsernameAlreadyExists()
        elif UsersTable.contains_email(email):
            raise EmailAlreadyExists()
        return UsersTable.__table.insert({
            'username': username,
            'email': email,
            'password': password,
            'image': store_image(image if image != 'undefined' else None),
            'games': []
        })

    def login(username: str, password: str):
        query = Query()
        found_user = UsersTable.__table.get( (query.username == username) & (query.password == password) )
        return found_user.doc_id if found_user else None

    def get(user_id: int):
        found_user = UsersTable.__table.get(doc_id=user_id)
        if found_user:
            return found_user
        else:
            raise UserDoesNotExist()

    def update(user_id: int, updated_data: dict[str, str], image: FileStorage | str):
        if not UsersTable.contains_id(user_id):
            raise UserDoesNotExist()
        if 'email' in updated_data:
            if UsersTable.contains_email(updated_data['email']):
                raise EmailAlreadyExists()
            UsersTable.__table.update(operations.set(
                'email', updated_data['email']), doc_ids=[user_id])
        if 'password' in updated_data:
            UsersTable.__table.update(operations.set(
                'password', updated_data['password']), doc_ids=[user_id])
        if image != 'undefined':
            image_path = store_image(image)
            UsersTable.__table.update(operations.set('image', image_path), doc_ids=[user_id])
    
    def add_game_to_user_library(user_id: int, game_name: str):
        if not UsersTable.contains_id(user_id):
            raise UserDoesNotExist()
        if not GamesTable.contains_name(game_name):
            raise GameDoesNotExist()
        UsersTable.__table.update(
            list_append('games', GamesTable.get_id_from_name(game_name)),
            doc_ids=[user_id]
        )
    
    def authorize_request(queried_id: int):
        identity = get_jwt_identity()
        queried = UsersTable.get(queried_id)
        if not identity or not queried or identity['type'] != 'user' or identity['username'] != queried['username']:
            raise IllegalAccess()