from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from tinydb import TinyDB
import toml

# Initilaizing the application
app = Flask(__name__, static_folder='./uploads')
app.config.from_file('./config.toml', load=toml.load)
CORS(app)
jwt = JWTManager(app)

# Initializing the database and tables
db = TinyDB(app.config['DATABASE_PATH'])
