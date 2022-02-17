#!/usr/bin/env python3
""" Index: Gives status of api """
from models import storage
from models.user import User
from models.post import Post
from api.v1.views import app_views
from flask import jsonify


@app_views.route('/status', methods=['GET'], strict_slashes=False)
def status():
    """ Status of API """
    return jsonify({'status': 'OK'})


@app_views.route('/stats', methods=['GET'], strict_slashes=False)
def stats():
    """ Give some statistics on current state of api
        - number of elements of each type of object
    """
    classes = [User, Post]
    names = ['users', 'posts']
    ln = len(names)
    num_objects = {names[i]: storage.count(classes[i]) for i in range(ln)}
    return jsonify(num_objects)
