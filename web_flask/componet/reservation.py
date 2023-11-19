#!/usr/bin/python3

from flask import Blueprint, render_template

reservation = Blueprint('reservation', __name__)


@reservation.route('/reservebed')
def reserve():
    return render_template('reserve.html')


@reservation.route('/assignBed')
def AssignBed():
     return render_template('assignBed.html')
