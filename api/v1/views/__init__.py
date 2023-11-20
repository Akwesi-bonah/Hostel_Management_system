#!/usr/bin/python3
""" Blueprint for API """
from flask import Blueprint
views = Blueprint('app_views', __name__, url_prefix='/api/v1')

from api.v1.views.index import *
from api.v1.views.students import *
from api.v1.views.block import *
from api.v1.views.staff import *