#!/usr/bin/env python3
""" Blueprint for api """
from flask import Blueprint

app_views = Blueprint('app_views', __name__, url_prefix='/api/v1')

from api.v1.views.users import *
from api.v1.views.index import *
from api.v1.views.log_in_out import *
from api.v1.views.user_interactions import *
