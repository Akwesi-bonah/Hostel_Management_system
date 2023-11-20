#!/usr/bin/python3
"""authication user"""

import models
from flask_login import LoginManager
login_manager = LoginManager()


@login_manager.user_loader
def load_user(user_email):
    """load user_id from database"""
    return models.storage.get_user_id(user_email)
