from flask import request
from flask_jwt_extended import create_access_token, jwt_required
from setup import app
from errors import UsernamePasswordMismatch, ResourceDoesNotExist
from tables.users_table import UsersTable


@app.post('/user')
def new_user():
    id = UsersTable.add(
        username=request.form['username'],
        password=request.form['password'],
        email=request.form['email'],
        image=request.files['image'] if 'image' in request.files else 'undefined'
    )
    return {
        'id': id,
        'token': create_access_token({
            'type': 'user',
            'username': request.form['username']
        })
    }


@app.get('/tokens/user')
def user_login():
    username, password = request.args['username'], request.args['password']
    user_id = UsersTable.login(username, password)
    if user_id:
        return {
            'id': user_id,
            'token': create_access_token({
                'type': 'user',
                'username': request.args['username']
            })
        }
    else:
        raise UsernamePasswordMismatch()


@app.patch('/user/<int:id>')
@jwt_required()
def update_user_data(id: int):
    UsersTable.authorize_request(id)
    UsersTable.update(
        id,
        request.form,
        request.files['image'] if 'image' in request.files else 'undefined'
    )
    return {
        'msg': 'Updated successfully'
    }


@app.put('/user/<int:id>/games')
@jwt_required()
def add_game_to_user_library(id):
    UsersTable.authorize_request(id)
    UsersTable.add_game_to_user_library(id, request.args['game_name'])
    return {
        'msg': 'Game added to library'
    }


@app.get('/user/<int:id>/<string:resource>')
@jwt_required()
def get_user_data(id: int, resource: str):
    if resource not in ['username', 'email', 'image', 'games']:
        raise ResourceDoesNotExist()
    UsersTable.authorize_request(id)
    user = UsersTable.get(id)
    return {
        resource: user[resource]
    }
