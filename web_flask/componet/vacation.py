#!/usr/bin/python3

from flask import Blueprint, render_template
from web_flask.componet import staff_view


@staff_view.route('/vacation')
def vacation_stay():
    return render_template('vacation.html')
