#!/usr/bin/python3
"""
flask setup
"""
import os

from flask import Flask
from flask_login import LoginManager
import models
from models import storage
from models.staff import Staff
from models.student import Student
from web_flask.componet.views import staff_view
from web_flask.student_model import student_views


def create_app():
    app = Flask(__name__)
    # database connection
    app.config['SECRET_KEY'] = 'hard to guess asdiohlkn,adugj;kan,msdhstring'
    login_manager_staff = LoginManager()
    login_manager_staff.init_app(app)
    login_manager_staff.session_protection = "strong"
    login_manager_staff.login_view = 'staff_view.dashboard'

    login_manager_student = LoginManager()
    login_manager_student.init_app(app)
    login_manager_student.session_protection = "strong"
    login_manager_student.login_view = 'student_views.login'
    app.config['SESSION_COOKIE_NAME'] = 'staff_session'
    app.config['SESSION_COOKIE_NAME'] = 'student_session'

    @login_manager_staff.user_loader
    def load_staff_user(user_id):
        """load user"""
        return Staff.query.get(user_id)

    @login_manager_student.user_loader
    def load_student_user(user_id):
        """load user"""
        student = storage.session.query(Student).filter(Student.id == user_id).first()
        if student:
            return student
        return None

    # blueprint registration
    app.register_blueprint(staff_view, url_prefix='/')
    app.register_blueprint(student_views, url_prefix='/')

    return app