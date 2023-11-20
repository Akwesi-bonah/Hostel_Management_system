#!/usr/bin/python3
"""
flask setup
"""
import os

from flask import Flask
from flask_login import LoginManager

from web_flask.componet.views import staff_view
from web_flask.student_model import student_views
from web_flask.componet.auth import login_manager


def create_app():
    app = Flask(__name__)
    # database connection
    app.config['SECRET_KEY'] = 'hard to guess string'
    login_manager.init_app(app)

    # blueprint registration
    app.register_blueprint(staff_view, url_prefix='/')
    app.register_blueprint(student_views, url_prefix='/')

    return app