#!/usr/bin/python3

from flask import Blueprint, render_template
from web_flask.componet import staff_view


@staff_view.route('/user/profile')
def profile_info():
    return render_template('profile.html')
