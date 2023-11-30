#!/usr/bin/python3
"""
flask setup
"""
import os

from flask import Flask, session, g, redirect, url_for
from web_flask.componet.views import staff_view
from web_flask.student_model import student_views


def create_app():
    app = Flask(__name__)
    # database connection
    app.config['SECRET_KEY'] = os.urandom(24)
    app.config['SESSION_COOKIE_NAME'] = 'staff_session'
    app.config['STUDENT_SESSION_COOKIE_NAME'] = 'student_session'


    # @app.before_request
    def before_request():
        g.user = None
        if 'user' not in session:
            return redirect(url_for('staff_view.base'))
        else:
            g.user_id = session['user_id']
            g.user = session['user']

    app.register_blueprint(staff_view, url_prefix='/')
    app.register_blueprint(student_views, url_prefix='/')
    return app