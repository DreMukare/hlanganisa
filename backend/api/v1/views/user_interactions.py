#!/usr/bin/env python3
""" Handle endpoints for user interactions """
import jwt
import json
import bcrypt
import logging
from models.user import User
from models.post import Request, Review
from models import storage, redis_cache
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request, current_app

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)
format = '%(asctime)s:%(levelname)s:%(filename)s:%(funcName)s:%(message)s'
formatter = logging.Formatter(format)

file_handler = logging.FileHandler('api_interactions.log')
file_handler.setFormatter(formatter)

logger.addHandler(file_handler)


def retrieve_values(class_name, key):
    """
    Retrieve values from redis cache
    """
    value_data = redis_cache.get(key)
    if value_data is None:
        value = storage.get(class_name, key)
        if not value:
            return None
        value_data = value.to_dict()
        j_value_data = json.dumps(value_data)
        redis_cache.store(key, j_value_data)
    return value_data

@app_views.route('/reviews', methods=['POST'], strict_slashes=False)
def post_review():
    """
    Retrieve reviews made by a user
    Expects the following data:
    - reviewee_id: id of the user being reviewed
    - description: Content of the review
    - rating: numeric rating
    """
    if not request.get_json():
        abort(400, description="Not a JSON")

    if 'reviewee_id' not in request.get_json():
        abort(400, description="Missing reviewee id")
    if "content" not in request.get_json():
        abort(400, description="Missing description")
    if "rating" not in request.get_json():
        abort(400, description="Missing rating")
    if "user_id" not in request.get_json():
        abort(400, description="Missing user_id")
    if 'X-Token' not in request.headers:
        abort(401, description="Missing X-Token authorization token")

    token = request.headers.get('X-Token')
    if not token:
        abort(401, description="Unauthorized")
    if not redis_cache.is_logged_in(token):
        abort(401, description="Not logged in")
    data = request.get_json()
    review = Review(**data)
    review.save()
    try:
        key = current_app.secret_key
        decoded = jwt.decode(token, key, algorithms="HS256")
    except Exception:
        abort(401, "Not logged in")
    user_id = decoded['user']
    user = storage.get(User, user_id)
    if not user:
        abort(404)
    # update user's rating
    user = storage.get(User, data["reviewee_id"])
    user.rating_count += 1
    curr_rating = user.rating
    new_rating = (curr_rating + float(data['rating'])) // user.rating_count
    user.rating = new_rating
    user.save()
    return make_response(jsonify(review.to_dict()), 201)


@app_views.route('/reviews', methods=['GET'], strict_slashes=False)
def get_reviews():
    """ Retrieve all the reviews made by a user """
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
    user_id = decoded['user']
    user = storage.get(User, user_id)
    if not user:
        abort(404)

    reviews = storage.all(Review).values()
    my_reviews = [review.to_dict() for review in reviews]
    return jsonify(my_reviews)


@app_views.route('/reviews/<review_id>', methods=['GET'], strict_slashes=False)
def get_review(review_id):
    """Retrieve a review """
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
    user_id = decoded['user']
    user = storage.get(User, user_id)
    if not user:
        abort(404)

    review_data = retrieve_values(Review, review_id)
    if review_data is None:
        abort(404)

    return jsonify(review_data)


@app_views.route('/reviews/<review_id>', methods=['PUT'], strict_slashes=False)
def put_review(review_id):
    """Retrieve a request """
    if 'X-Token' not in request.headers:
        abort(401, description="Missing X-Token authorization token")
    if not request.get_json():
        abort(400, description="Not a JSON")

    token = request.headers.get('X-Token')
    if not token:
        abort(401, description="Unauthorized")
    if not redis_cache.is_logged_in(token):
        abort(401, description="Not logged in")
    try:
        key = current_app.secret_key
        decoded = jwt.decode(token, key, algorithms="HS256")
    except Exception:
        abort(403, "Not logged in")
    user_id = decoded['user']
    user = storage.get(User, user_id)
    if not user:
        abort(404)

    review = storage.get(Review, review_id)
    if not review:
        abort(404)
    data = request.get_json()
    ignore = ["id", "created_at", "updated_at", "user_id"]
    for key, value in data.items():
        if key not in ignore:
            setattr(review, key, value)
    review.save()
    if "rating" in data:
        user = storage.get(User, data["reviewee_id"])
        user.rating_count += 1
        curr_rating = user.rating
        new_rating = (curr_rating + float(data['rating'])) // user.rating_count
        user.rating = new_rating
        user.save()
    return jsonify(review.to_dict())


@app_views.route('/reviews/<review_id>', methods=['DELETE'],
                 strict_slashes=False)
def delete_review(review_id):
    """ Delete a review """
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
        abort(403, "Not logged in")
    user_id = decoded['user']
    user = storage.get(User, user_id)
    if not user:
        abort(404)

    review = storage.get(Review, review_id)
    if not review:
        abort(404)

    storage.delete(review)
    storage.save()

    return make_response(jsonify({"status": "Review deleted"}), 200)


@app_views.route('/requests', methods=['POST'], strict_slashes=False)
def post_request():
    """
    Save requests made by a user
    Expects the following data:
    - content: Content of the request
    """
    if not request.get_json():
        abort(400, description="Not a JSON")

    if "content" not in request.get_json():
        abort(400, description="Missing content")
    if "user_id" not in request.get_json():
        abort(400, description="Missing user_id")
    if "category" not in request.get_json():
        abort(400, description="Missing category")
    if "status" not in request.get_json():
        abort(400, description="Missing status")
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
    except Exception as e:
        print(e)
        abort(401, "Not logged in")
    user_id = decoded['user']
    data = request.get_json()
    if user_id != data['user_id']:
        abort(404)
    my_request = Request(**data)
    my_request.save()
    return make_response(jsonify(my_request.to_dict()), 201)


@app_views.route('/requests', methods=['GET'], strict_slashes=False)
def get_requests():
    """ Retrieve all the requests that are still active"""
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
    user_id = decoded['user']
    if not user_id:
        abort(404)

    # requests = get_active_requests()
    requests = storage.get_active_requests()
    return jsonify(requests)


@app_views.route('/requests/<request_id>', methods=['GET'],
                 strict_slashes=False)
def get_request(request_id):
    """Retrieve a request """
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
    user_id = decoded['user']
    user = storage.get(User, user_id)
    if not user:
        abort(404)

    my_request_data = retrieve_values(Request, request_id)
    if my_request_data is None:
        abort(404)

    return jsonify(my_request_data)


@app_views.route('/requests/<request_id>', methods=['PUT'],
                 strict_slashes=False)
def put_request(request_id):
    """Retrieve a request """
    if 'X-Token' not in request.headers:
        abort(401, description="Missing X-Token authorization token")
    if not request.get_json():
        abort(401, description="Not a JSON")

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
    user_id = decoded['user']
    user = storage.get(User, user_id)
    if not user:
        abort(404)

    my_request = storage.get(Request, request_id)
    if not my_request:
        abort(404)
    data = request.get_json()
    ignore = ["id", "created_at", "updated_at", "user_id"]
    for key, value in data.items():
        if key not in ignore:
            setattr(my_request, key, value)
    my_request.save()
    return jsonify(my_request.to_dict())


@app_views.route('/requests/<request_id>', methods=['DELETE'],
                 strict_slashes=False)
def delete_request(request_id):
    """ Delete a request """
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
    user_id = decoded['user']
    user = storage.get(User, user_id)
    if not user:
        abort(404)

    my_request = storage.get(Request, request_id)
    if not request:
        abort(404)

    storage.delete(my_request)
    storage.save()

    return make_response(jsonify({"status": "Request deleted"}), 200)


@app_views.route('/reviews/users/<user_id>',
                 methods=['GET'], strict_slashes=False)
def get_requests_associated_with_user(user_id):
    """
    Retrieve reviews associated withthe given user_id, either
    - reviews made by a user
    - reviews a user has received
    - or both
    """
    if not request.get_json():
        abort(400, description="Not a JSON")

    if "type" not in request.get_json():
        abort(400, description="Missing type")
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
    except Exception as e:
        abort(401, "Not logged in")

    type = request.get_json()['type']
    if type == 'made for':
        reviews = storage.get_reviews_for_user(user_id)
        reviews_data = [review.to_dict() for review in reviews]
        return jsonify(reviews_data)
    elif type == 'made by':
        reviews = storage.get_reviews_by_user(user_id)
        reviews_data = [review.to_dict() for review in reviews]
        return jsonify(reviews_data)
    elif type == 'both':
        reviews_for = storage.get_reviews_for_user(user_id)
        reviews_for_data = [review.to_dict() for review in reviews_for]

        reviews_by = storage.get_reviews_by_user(user_id)
        reviews_by_data = [review.to_dict() for review in reviews_by]

        reviews_data = {
            "reviews_by": reviews_by_data,
            "reviews_for": reviews_for_data
        }
        return jsonify(reviews_data)

    abort(400, description="type not recognized")
