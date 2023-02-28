from flask import request
from flask_jwt_extended import create_access_token, jwt_required
from errors import DevNameAlreadyExists, ResourceDoesNotExist
from setup import app
from tables.devs_table import DevsTable
from tables.games_table import GamesTable

@app.post('/dev')
def new_dev():
    id = DevsTable.add(
        devname=request.form['devname'],
        password=request.form['password'],
        email=request.form['email'],
        image=request.files['image'] if 'image' in request.files else None
    )
    return {
        'id': id,
        'token': create_access_token({
            'type': 'dev',
            'devname': request.form['devname']
        })
    }


@app.get('/tokens/dev')
def dev_login():
    devname, password = request.args['devname'], request.args['password']
    dev_id = DevsTable.login(devname, password)
    if dev_id:
        return {
            'id': dev_id,
            'token': create_access_token({
                'type': 'dev',
                'devname': request.args['devname']
            })
        }
    else:
        raise DevNameAlreadyExists()


@app.patch('/dev/<int:id>')
@jwt_required()
def update_dev_data(id: int):
    DevsTable.authorize_request(id)
    DevsTable.update(
        id,
        request.form,
        request.files['image'] if 'image' in request.files else 'undefined'
    )
    return {
        'msg': 'Updated successfully'
    }


@app.post('/dev/<int:id>/games')
@jwt_required()
def publish_game(id):
    DevsTable.authorize_request(id)
    game_id = GamesTable.add(
        name=request.form['name'],
        price=request.form['price'],
        description=request.form['description'],
        image=request.files['image'] if 'image' in request.files else None
    )
    DevsTable.publish_game(id, game_id);
    return {
        'msg': 'Game published'
    }


@app.get('/dev/<int:id>/<string:resource>')
@jwt_required()
def get_dev_data(id: int, resource: str):
    if resource not in ['devname', 'email', 'image', 'games']:
        raise ResourceDoesNotExist()
    DevsTable.authorize_request(id)
    dev = DevsTable.get(id)
    return {
        resource: dev[resource]
    }
