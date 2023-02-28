from typing import Any
from flask import url_for
from setup import app
from werkzeug.datastructures import FileStorage
from werkzeug.utils import secure_filename
import random


def store_image(image_file: FileStorage | None):
    if not image_file:
        return None
    secure_image_name = secure_filename(str(random.getrandbits(64)))
    _, extension = image_file.content_type.split('/')
    image_path = f'{app.config["UPLOAD_FOLDER"]}/{secure_image_name}.{extension}'
    image_file.save(image_path)
    return url_for('static', filename=f'{secure_image_name}.{extension}', _external=True)


def list_append(field: str, item: Any):
    def operation(document):
        document[field].append(item)
    return operation
