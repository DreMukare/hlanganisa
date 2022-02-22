#!/usr/bin/env python3
"""
Handle user login and logout (temp)
"""
import jwt
import bcrypt
import logging
from datetime import datetime, timedelta
from models.user import User
from models import storage, redis_cache
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request, current_app

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)
format = '%(asctime)s:%(levelname)s:%(filename)s:%(funcName)s:%(message)s'
formatter = logging.Formatter(format)

file_handler = logging.FileHandler('api_login.log')
file_handler.setFormatter(formatter)

logger.addHandler(file_handler)


@app_views.route('/login', methods=['POST'], strict_slashes=False)
def login():
    """
    Log in a user
    """
    if not request.get_json():
        abort(401, description="Not a JSON")
    if 'email' not in request.get_json():
        abort(401, description="Missing email")
    if 'password' not in request.get_json():
        abort(401, description="Missing password")

    data = request.get_json()
    try:
        users = storage.all(User).values()
        user = None
        for u in users:
            if u.email == data['email']:
                user = u
    except Exception:
        abort(404)

    if user and bcrypt.checkpw(data['password'].encode('utf-8'),
                               user.password.encode('utf-8')):
        key = current_app.secret_key
        dt = datetime.utcnow() + timedelta(hours=24)
        payload = {'user': user.id, 'exp': dt}
        token = jwt.encode(payload, key, algorithm='HS256')
        redis_cache.set_add_logged_in(token)
        response_data = user.to_dict()
        response_data['token'] = token
        response = make_response(jsonify(response_data), 200)
        response.headers['X-Token'] = token
        return response
    else:
        abort(401, description="Invalid login")


@app_views.route('/logout', methods=['GET'], strict_slashes=False)
def logout():
    """
    Logout a logged in user based on their token
    """
    if 'X-Token' not in request.headers:
        abort(401, description='Missing X-Token')

    token = request.headers['X-Token']
    if redis_cache.is_logged_in(token):
        redis_cache.remove_logged_in(token)
        response = {"status": "Logged out"}
        return jsonify(response)
    else:
        response = {"status": "Not logged in"}
        return jsonify(response)
