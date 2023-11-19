#!/usr/bin/python3

from flask import Blueprint, render_template

profile = Blueprint('profile', __name__)


@profile.route('/user/profile')
def profile_info():
    return render_template('profile.html')
