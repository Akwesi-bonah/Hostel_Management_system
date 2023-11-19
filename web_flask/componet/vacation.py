#!/usr/bin/python3

from flask import Blueprint, render_template

vacation = Blueprint('vacation', __name__)


@vacation.route('/vacation')
def vacation_stay():
    return render_template('vacation.html')
