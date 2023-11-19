#!/usr/bin/python3

from flask import Blueprint, render_template

checkin = Blueprint('checkin', __name__)


@checkin.route('/studentCheckin')
def student_checkin():
    return render_template('studentCheckin.html')


@checkin.route('/checkinSummary')
def check_in_summary():
    return render_template('checkinSummary.html')

