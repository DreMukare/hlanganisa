#!/usr/bin/env python3
"""
Flask Application
"""

from os import environ, makedirs, path
import secrets
from flask import Flask, jsonify, make_response
from api.v1.views import app_views
from models import storage

app = Flask(__name__)
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True
app.register_blueprint(app_views)


def create_folders():
    """
    On startup, create folders for profile images and work images
    if they do not exist
    """
    root_path = app.instance_path
    profile_images_path = path.join(root_path, 'profile_pics')
    try:
        makedirs(profile_images_path)
    except OSError as error:
        print(error)
        pass  # add logger error message

    work_images_path = path.join(root_path, 'work_images')
    try:
        makedirs(work_images_path)
    except OSError as error:
        print(error)
        pass  # add logger error message


@app.teardown_appcontext
def close_db(error):
    """ Close storage """
    storage.close()


@app.errorhandler(404)
def not_found(error):
    """ Handle 404 errors """
    return make_response(jsonify({'error': 'Not found'}), 404)


if __name__ == '__main__':
    host = environ.get('HOST') or '0.0.0.0'
    port = environ.get('PORT') or '5000'
    create_folders()
    app.run(host=host, port=port, threaded=True)
