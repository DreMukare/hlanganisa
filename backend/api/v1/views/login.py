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


@app_views.route('/login', methods=['GET'])
def login():
    if 'email' not in request.get_json():
        abort(400, description="Missing email")
    if 'password' not in request.get_json():
        abort(400, description="Missing password")
    else:
        try:
            # fetch the user data
            user = User.query.filter_by(email=request.json('email')).first()
            auth_token = user.encode_auth_token(user.id)
            if auth_token:
                response = {
                    'message': 'Successfully logged in.',
                }
                return make_response(jsonify(response)), 200
        except:
            return make_response(jsonify(response="Failed to login user")), 500
        
