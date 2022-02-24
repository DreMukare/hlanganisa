#!/usr/bin/env python3
"""
Flask Application
"""
import logging
from api.v1.views import app_views
from os import environ, makedirs, path
from flask import Flask, jsonify, make_response
from flask_cors import CORS
from models import storage, redis_cache

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)
format = '%(asctime)s:%(levelname)s:%(filename)s:%(funcName)s:%(message)s'
formatter = logging.Formatter(format)

file_handler = logging.FileHandler('api.log')
file_handler.setFormatter(formatter)

logger.addHandler(file_handler)

app = Flask(__name__)
cors = CORS(app)
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True
app.config['SECRET_KEY'] = '1234'

app.register_blueprint(app_views)


def create_folders():
    """
    On startup, create folders for profile images and work images
    if they do not exist
    """
    root_path = app.instance_path
    profile_images_path = path.join(root_path, 'profile_pics')
    try:
        if not path.exists(profile_images_path):
            makedirs(profile_images_path)
    except OSError as error:
        logger.error(error)

    work_images_path = path.join(root_path, 'work_images')
    try:
        if not path.exists(work_images_path):
            makedirs(work_images_path)
    except OSError as error:
        logger.error(error)


@app.teardown_appcontext
def close_db(error):
    """ Close storage """
    #redis_cache.flush()
    storage.close()


@app.errorhandler(404)
def not_found(error):
    """ Handle 404 errors """
    return make_response(jsonify({'error': 'Not found'}), 404)


@app.errorhandler(400)
def not_found(error):
    """ Handle 400 errors """
    return make_response(jsonify(str(error)), 400)


@app.errorhandler(401)
def not_found(error):
    """ Handle 400 errors """
    return make_response(jsonify(str(error)), 401)


if __name__ == '__main__':
    host = environ.get('HOST') or '0.0.0.0'
    port = environ.get('PORT') or '5000'
    create_folders()
    app.run(host=host, port=port, threaded=True)
    logger.info("App is running")
