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
from flask_login import login_user, current_user, logout_user, login_required
import jwt  # generate token
import datetime
from functools import wraps #

app.config['SECRET_KEY'] =  '71926b520c54bcac05e993951d554612'
"""
def token_required(f):
	@wraps(f)
	def decorated(*args, **kwargs):
		token = request.args.get('token')
		if not token:
			return jsonify({'message' : 'Token is missing!'}) 403 
		try:
	   		data = jwt.decode(token, app.config{'SECRET_KEY'])
		except:
	     		return jsonify({'message' : 'Token is invalid!'}), 403
		return f(*args, **kwargs)
	return decorated
"""
@app.route('/login')
def login():

	auth = request.authorization # check if username and password is passed

	if auth and auth.password == storage.get(User, user_id)
		token = jwt.encode({'user' : auth.username, 'exp' : datetime.datetime.utcnow() + datetime.timedelta(hour=24)})
		return jsonify({'token' : tokendecode('UTF-8')})

	return (401)
