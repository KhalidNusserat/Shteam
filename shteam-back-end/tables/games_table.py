from flask_jwt_extended import get_jwt_identity
from tinydb import Query
from errors import GameDoesNotExist, GameNameAlreadyExists
from helpers import store_image
from setup import db
from werkzeug.datastructures import FileStorage

class GamesTable:
    __table = db.table('games')

    def contains_id(game_id: int) -> bool:
        return GamesTable.__table.contains(doc_id=game_id)

    def contains_name(game_name: str) -> bool:
        return GamesTable.__table.contains(Query().name == game_name)

    def get_id_from_name(game_name: str) -> int:
        return GamesTable.__table.get(Query().name == game_name).doc_id

    def add(name: str, price: float, description: str, image: FileStorage):
        if GamesTable.__table.contains(Query().name == name):
            raise GameNameAlreadyExists()
        return GamesTable.__table.insert({
            'name': name,
            'price': price,
            'description': description,
            'image': store_image(image)
        })

    def get(game_id: int):
        found_game = GamesTable.__table.get(doc_id=game_id)
        if found_game:
            return found_game
        else:
            raise GameDoesNotExist()
    
    def getAll():
        return GamesTable.__table.all()