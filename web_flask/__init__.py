#!/usr/bin/python3
"""
flask setup
"""
import os

from flask import Flask
from flask_login import LoginManager
import  models
from web_flask.componet.views import staff_view
from web_flask.student_model import student_views


def create_app():
    app = Flask(__name__)
    # database connection
    app.config['SECRET_KEY'] = 'hard to guess string'
    login_manager = LoginManager()
    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(user_email):
        """load user_id from database"""
        return models.storage.get_user_id(user_email)

    # blueprint registration
    app.register_blueprint(staff_view, url_prefix='/')
    app.register_blueprint(student_views, url_prefix='/')

    return app