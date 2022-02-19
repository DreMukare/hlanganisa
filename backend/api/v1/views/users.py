#!/usr/bin/env python3
""" Handle RESTFul API actions for users """
import bcrypt
from os import path, mkdir
from flask import current_app
from models.user import User
from models import storage, image_storage, redis_cache
from models.db_storage import ImageStorage, RedisCache
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request


def hash_password(password):
    """ Encrypt password """
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed


@app_views.route('/users', methods=['GET'], strict_slashes=False)
def get_users():
    """
    Retrieves a list of all users
    """
    users = storage.all(User).values()
    users_data = [user.to_dict() for user in users]
    return jsonify(users_data)


@app_views.route('/users/<user_id>', methods=['GET'], strict_slashes=False)
def get_user(user_id):
    """
    Retrieve a specific user's data
    """
    user = storage.get(User, user_id)
    if not user:
        abort(404)
    user_data = user.to_dict()

    image_path = user_data.get('profile_image')
    user_profile_image = image_storage.get_image(image_path)
    del user_data['profile_image']
    user_data['profile_image'] = user_profile_image

    if user_data.get('type') == 'service provider':
        work_image_path = user_data.get('work_images')
        work_images = image_storage.get_images(work_image_path)
        del user_data['work_images']
        user_data['work_images'] = work_images

    return jsonify(user_data)


@app_views.route('/users/<user_id>', methods=['DELETE'],
                 strict_slashes=False)
def delete_user(user_id):
    """
    Deletes a user Object
    """
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
    data['password'] = hash_password(data['password'])
    user = User(**data)
    user.save()
    if data.get('type') == 'service provider':
        work_images_dir = path.join(current_app.instance_path,
                                    'work_images', user.id)
        mkdir(work_images_dir)  # add error checking and logging
    return make_response(jsonify(user.to_dict()), 201)


@app_views.route('/users/<user_id>', methods=['PUT'], strict_slashes=False)
def put_user(user_id):
    """
    Updates a user's information
    """
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
            size = 125
            image_storage.save_image(size, image_path, image)
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
