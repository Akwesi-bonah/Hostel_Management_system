#!/usr/bin/python3

from flask import Blueprint, render_template
from web_flask.componet import staff_view


@staff_view.route('/reserve_bed')
def reserve():
    return render_template('reserve.html')


@staff_view.route('/assignBed')
def AssignBed():
     return render_template('assignBed.html')
