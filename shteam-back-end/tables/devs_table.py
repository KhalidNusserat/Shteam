from flask_jwt_extended import get_jwt_identity
from tinydb import Query, operations
from errors import DevDoesNotExist, DevNameAlreadyExists, EmailAlreadyExists, GameDoesNotExist, IllegalAccess
from helpers import list_append, store_image
from setup import db
from werkzeug.datastructures import FileStorage

from tables.games_table import GamesTable

class DevsTable:
    __table = db.table('devs')

    def contains_devname(devname: str) -> bool:
        return DevsTable.__table.contains(Query().devname == devname)

    def contains_id(dev_id: int) -> bool:
        return DevsTable.__table.contains(doc_id=dev_id)
    
    def contains_email(email: str) -> bool:
        return DevsTable.__table.contains(Query().email == email)

    def add(devname: str, email: str, password: str, image: FileStorage | None):
        if DevsTable.__table.contains(Query().devname == devname):
            raise DevNameAlreadyExists()
        elif DevsTable.__table.contains(Query().email == email):
            raise EmailAlreadyExists()
        return DevsTable.__table.insert({
            'devname': devname,
            'email': email,
            'password': password,
            'image': store_image(image),
            'games': []
        })
    
    def login(devname: str, password: str) -> int | None:
        query = Query()
        found_dev = DevsTable.__table.get( (query.devname == devname) & (query.password == password) )
        return found_dev.doc_id if found_dev else None

    def get(dev_id: int):
        found_dev = DevsTable.__table.get(doc_id=dev_id)
        if found_dev:
            return found_dev
        else:
            raise DevDoesNotExist()
    
    def update(dev_id: int, updated_data: dict[str, str], image: FileStorage | None):
        if not DevsTable.contains_id(dev_id):
            raise DevDoesNotExist()
        if 'email' in updated_data:
            if DevsTable.contains_email(updated_data['email']):
                raise EmailAlreadyExists()
            DevsTable.__table.update(operations.set(
                'email', updated_data['email']), doc_ids=[dev_id])
        if 'password' in updated_data:
            DevsTable.__table.update(operations.set(
                'password', updated_data['password']), doc_ids=[dev_id])
        if image != 'undefined':
            image_path = store_image(image)
            DevsTable.__table.update(operations.set('image', image_path), doc_ids=[dev_id])
    
    def publish_game(dev_id: int, game_id: int):
        if not DevsTable.contains_id(dev_id):
            raise DevDoesNotExist()
        DevsTable.__table.update(list_append('games', game_id), doc_ids=[dev_id])
    
    def authorize_request(queried_id: int):
        identity = get_jwt_identity()
        queried = DevsTable.get(queried_id)
        if not identity or not queried or identity['type'] != 'dev' or identity['devname'] != queried['devname']:
            raise IllegalAccess()