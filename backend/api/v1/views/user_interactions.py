#!/usr/bin/env python3
""" Handle endpoints for user interactions """
import bcrypt
from models.user import User
from models.post import Post
from models import storage, redis_cache
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request


@app_views.route('/review', methods=['POST'], strict_slashes=False)
def get_review():
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
    if 'X-Token' not in request.headers:
        abort(401, description="Missing X-Token authorization token")

    token = request.headers.get('X-Token')
    if not token:
        abort(401, description="Unauthorized"))
    user_id = redis_cache.get(token)
    user = storage.get(User, user_id)
    if not user:
        abort(404)

    data = request.get_json()
    data['user_id'] = user.id
    data['other_id'] = data['reviewee_id']
    data['type'] = 'review'
    del data['reviewee_id']
    post = Post(**data)
    post.save()
    # work out how to update user's rating
    return make_response(jsonify(post.to_dict()), 201)


@app_views.route('/review', methods=['GET'], strict_slashes=False)
def get_reviews():
    """ Retrieve all the reviews made by a user """
    if 'X-Token' not in request.headers:
        abort(401, description="Missing X-Token authorization token")

    token = request.headers.get('X-Token')
    if not token:
        abort(401, description="Unauthorized"))
    user_id = redis_cache.get(token)
    user = storage.get(User, user_id)
    if not user:
        abort(404)

    reviews = storage.all(Post)
    my_reviews = [review.to_dict() for review in reviews if review.user_id == user_id]
    return jsonify(my_reviews)


@app_views.route('/review/<review_id>', methods=['GET'], strict_slashes=False)
def get_review(review_id):
    """Retrieve a review """
    if 'X-Token' not in request.headers:
        abort(401, description="Missing X-Token authorization token")

    token = request.headers.get('X-Token')
    if not token:
        abort(401, description="Unauthorized"))
    user_id = redis_cache.get(token)
    user = storage.get(User, user_id)
    if not user:
        abort(404)

    review = storage.get(Post, review_id)
    if not review:
        abort(404)

    return jsonify(review.to_dict())


@app_views.route('/review/<review_id>', methods=['DELETE'],
                 strict_slashes=False)
def delete_review(review_id):
    """ Delete a review """
    if 'X-Token' not in request.headers:
        abort(401, description="Missing X-Token authorization token")

    token = request.headers.get('X-Token')
    if not token:
        abort(401, description="Unauthorized"))
    user_id = redis_cache.get(token)
    user = storage.get(User, user_id)
    if not user:
        abort(404)

    review = storage.get(Post, review_id)
    if not review:
        abort(404)

    storage.delete(review)
    storage.save()

    return make_response(jsonify({}), 200)


@app_views.route('/request', methods=['POST'], strict_slashes=False)
def get_request():
    """
    Save requests made by a user
    Expects the following data:
    - content: Content of the request
    """
    if not request.get_json():
        abort(400, description="Not a JSON")

    if "content" not in request.get_json():
        abort(400, description="Missing description")
    if 'X-Token' not in request.headers:
        abort(401, description="Missing X-Token authorization token")

    token = request.headers.get('X-Token')
    if not token:
        abort(401, description="Unauthorized"))
    user_id = redis_cache.get(token)
    user = storage.get(User, user_id)
    if not user:
        abort(404)

    data = request.get_json()
    data['user_id'] = user.id
    data['type'] = 'request'
    data['other_id'] = dummy.id  # set up a dummy user for this purpose
    post = Post(**data)
    post.save()
    return make_response(jsonify(post.to_dict()), 201)


@app_views.route('/request', methods=['GET'], strict_slashes=False)
def get_requests():
    """ Retrieve all the requests made by a user """
    if 'X-Token' not in request.headers:
        abort(401, description="Missing X-Token authorization token")

    token = request.headers.get('X-Token')
    if not token:
        abort(401, description="Unauthorized"))
    user_id = redis_cache.get(token)
    user = storage.get(User, user_id)
    if not user:
        abort(404)

    requests = storage.all(Post)
    my_requests = [request.to_dict() for request in requests if request.user_id == user_id]
    return jsonify(my_requests)


@app_views.route('/request/<request_id>', methods=['GET'], strict_slashes=False)
def get_request(request_id):
    """Retrieve a request """
    if 'X-Token' not in request.headers:
        abort(401, description="Missing X-Token authorization token")

    token = request.headers.get('X-Token')
    if not token:
        abort(401, description="Unauthorized"))
    user_id = redis_cache.get(token)
    user = storage.get(User, user_id)
    if not user:
        abort(404)

    request = storage.get(Post, request_id)
    if not request:
        abort(404)

    return jsonify(request.to_dict())


@app_views.route('/request/<request_id>', methods=['DELETE'],
                 strict_slashes=False)
def delete_request(request_id):
    """ Delete a request """
    if 'X-Token' not in request.headers:
        abort(401, description="Missing X-Token authorization token")

    token = request.headers.get('X-Token')
    if not token:
        abort(401, description="Unauthorized"))
    user_id = redis_cache.get(token)
    user = storage.get(User, user_id)
    if not user:
        abort(404)

    request = storage.get(Post, request_id)
    if not request:
        abort(404)

    storage.delete(request)
    storage.save()

    return make_response(jsonify({}), 200)
