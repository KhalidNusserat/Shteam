from flask_jwt_extended import jwt_required
from setup import app
from tables.games_table import GamesTable

@app.get('/game/<int:game_id>')
def get_game(game_id: int):
    return {
        'game': GamesTable.get(game_id)
    }

@app.get('/game')
def get_games():
    return {
        'games': GamesTable.getAll()
    }