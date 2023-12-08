#!/usr/bin/python3
"""
flask setup
"""
import os

from flask import Flask, session, g, redirect, url_for
from web_flask.componet.views import staff_view
from web_flask.student_model import student_views
from flask_session import Session
from flask_mail import Mail
from web_flask.componet.mail import mail
from paystackapi.paystack import Paystack


def create_app():
    app = Flask(__name__)
    # database connection
    app.config['SECRET_KEY'] = os.urandom(24)
    app.config['SESSION_COOKIE_NAME'] = 'staff_session'
    app.config['STUDENT_SESSION_COOKIE_NAME'] = 'student_session'
    app.config["SESSION_PERMANENT"] = False
    app.config["SESSION_TYPE"] = "filesystem"
    app.config['SESSION_FILE_DIR'] = './.flask_session/'
    app.config['SESSION_KEY_PREFIX'] = 'session:'
    app.config['SESSION_COOKIE_SECURE'] = False

    app.config['PAYSTACK_SECRET_'] = 'sk_test_7530309aeb43b700e14cf312de735ad407747903'
    app.config['PAYSTACK_PUBLIC_KEY'] = 'pk_test_4ccdf50310beaaefdde4febbcef5fee8fbbd7011'

    # Configure Flask-Mail
    app.config['MAIL_SERVER'] = 'smtp.gmail.com'
    app.config['MAIL_PORT'] = 587
    app.config['MAIL_USERNAME'] = 'ranisminth@gmail.com'
    app.config['MAIL_PASSWORD'] = ''
    app.config['MAIL_USE_TLS'] = True
    app.config['MAIL_USE_SSL'] = False
    mail.init_app(app)
    Session(app)

    app.register_blueprint(staff_view, url_prefix='/staff/')
    app.register_blueprint(student_views, url_prefix='/')

    return app
