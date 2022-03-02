#!/usr/bin/env python3
""" Handle RESTFul API actions for users """
import jwt
import json
import bcrypt
import logging
from os import path, mkdir
from datetime import datetime, timedelta
from flask import current_app
from models.user import User
from models import storage, image_storage, redis_cache
from models.db_storage import ImageStorage, RedisCache
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)
format = '%(asctime)s:%(levelname)s:%(filename)s:%(funcName)s:%(message)s'
formatter = logging.Formatter(format)

file_handler = logging.FileHandler('api_users.log')
file_handler.setFormatter(formatter)

logger.addHandler(file_handler)


def hash_password(password):
    """ Encrypt password """
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed


def retrieve_values(key):
    """
    Retrieve values from redis cache
    """
    user = redis_cache.get(key)
    if user is None:
        user = storage.get(User, key)
        if not user:
            return None
        user_data = user.to_dict()
        j_user_data = json.dumps(user_data)
        redis_cache.store(key, j_user_data)
    else:
        user_data = user
    return user_data


@app_views.route('/users', methods=['GET'], strict_slashes=False)
def get_users():
    """
    Retrieves a list of all users
    """
    if 'X-Token' not in request.headers:
        abort(401, description="Missing X-Token authorization token")

    token = request.headers.get('X-Token')
    if not token:
        abort(401, description="Unauthorized")
    if not redis_cache.is_logged_in(token):
        abort(401, description="Not logged in")
    try:
        key = current_app.secret_key
        decoded = jwt.decode(token, key, algorithms="HS256")
    except Exception:
        abort(401, "Not logged in")
    users = storage.all(User).values()
    users_data = [user.to_dict() for user in users]
    return jsonify(users_data)


@app_views.route('/users/<user_id>', methods=['GET'], strict_slashes=False)
def get_user(user_id):
    """
    Retrieve a specific user's data
    """
    if 'X-Token' not in request.headers:
        abort(401, description="Missing X-Token authorization token")

    token = request.headers.get('X-Token')
    if not token:
        abort(401, description="Unauthorized")
    if not redis_cache.is_logged_in(token):
        abort(401, description="Not logged in")
    try:
        key = current_app.secret_key
        decoded = jwt.decode(token, key, algorithms="HS256")
    except Exception:
        abort(401, "Not logged in")
    user_data = retrieve_values(user_id)
    if user_data is None:
        abort(404)
    return jsonify(user_data)


@app_views.route('/users/<user_id>', methods=['DELETE'],
                 strict_slashes=False)
def delete_user(user_id):
    """
    Deletes a user Object
    """
    if 'X-Token' not in request.headers:
        abort(401, description="Missing X-Token authorization token")

    token = request.headers.get('X-Token')
    if not token:
        abort(401, description="Unauthorized")
    if not redis_cache.is_logged_in(token):
        abort(401, description="Not logged in")
    try:
        key = current_app.secret_key
        decoded = jwt.decode(token, key, algorithms="HS256")
    except Exception:
        abort(401, "Not logged in")

    user = storage.get(User, user_id)
    if not user:
        abort(404)

    storage.delete(user)
    storage.save()

    return make_response(jsonify({}), 200)


@app_views.route('/users', methods=['POST'], strict_slashes=False)
def post_user():
    """
    Creates a user
    """
    if not request.get_json():
        abort(400, description="Not a JSON")

    if 'type' not in request.get_json():
        abort(400, description="Missing type")
    if 'name' not in request.get_json():
        abort(400, description="Missing name")
    if 'email' not in request.get_json():
        abort(400, description="Missing email")
    if 'password' not in request.get_json():
        abort(400, description="Missing password")

    data = request.get_json()
    existing_user = storage.get_user_by_email(data['email'])
    if existing_user:
        abort(400, description="Email already exists")
    data['password'] = hash_password(data['password'])
    user = User(**data)
    user.save()
    if data.get('type') == 'service provider':
        work_images_dir = path.join(current_app.instance_path,
                                    'work_images', user.id)
        if not path.exists(work_images_dir):
            try:
                mkdir(work_images_dir)
            except OSError as error:
                pass  # add error checking and logging
    dt = datetime.utcnow() + timedelta(hours=24)
    key = current_app.secret_key
    token = jwt.encode({'user': user.id, 'exp': dt}, key, algorithm='HS256')
    redis_cache.set_add_logged_in(token)
    response_data = user.to_dict()
    response_data['token'] = token
    response = make_response(jsonify(response_data), 201)
    response.headers['X-Token'] = token
    return response


@app_views.route('/users/<user_id>', methods=['PUT'], strict_slashes=False)
def put_user(user_id):
    """
    Updates a user's information
    """
    if 'X-Token' not in request.headers:
        abort(401, description="Missing X-Token authorization token")

    token = request.headers.get('X-Token')
    if not token:
        print('Token not valid')
        abort(401, description="Unauthorized: Token not valid")
    if not redis_cache.is_logged_in(token):
        abort(401, description="Not logged in")
    try:
        key = current_app.secret_key
        decoded = jwt.decode(token, key, algorithms="HS256")
    except Exception:
        abort(401, "Not logged in")

    user = storage.get(User, user_id)

    if not user:
        abort(404)

    if not request.get_json():
        abort(400, description="Not a JSON")

    ignore = ['id', 'email', 'created_at', 'updated_at', 'rating', 'password']
    process = ['profile_image', 'work_images']

    data = request.get_json()
    type = user.type
    root_path = current_app.instance_path
    for key, value in data.items():
        if key not in ignore and key not in process:
            setattr(user, key, value)
        if key == 'profile_image':
            image = image_storage.process_incoming_image(value)
            image_path = image_storage.generate_path('profile',
                                                     user_id, root_path)
            image_storage.save_image(image_path, image)
            setattr(user, key, image_path)
        if key == 'work_images' and type == 'service provider':
            print('Updating work images')
            for index, image in enumerate(value):
                image = image_storage.process_incoming_image(image)
                image_path = image_storage.generate_path('work',
                                                         user_id,
                                                         root_path, index)
                size = 125
                image_storage.save_image(size, image_path, image)
            image_path = path.dirname(image_path)
            setattr(user, key, image_path)
    storage.save()
    return make_response(jsonify(user.to_dict()), 200)


@app_views.route('/users/category', methods=['POST'], strict_slashes=False)
def get_users_by_category():
    """
    Retrieves service providers based on the category of service they provide
    """
    if not request.get_json():
        abort(400, description="Not a JSON")
    if 'category' not in request.get_json():
        abort(400, description="Missing category")
    if 'X-Token' not in request.headers:
        abort(401, description="Missing X-Token authorization token")

    token = request.headers.get('X-Token')
    if not token:
        abort(401, description="Unauthorized")
    if not redis_cache.is_logged_in(token):
        abort(401, description="Not logged in")
    try:
        key = current_app.secret_key
        decoded = jwt.decode(token, key, algorithms="HS256")
    except Exception:
        abort(401, "Not logged in")
    category = request.get_json()['category']
    users = storage.get_users_by_category(category)
    users_data = [user.to_dict() for user in users]
    return jsonify(users_data)
