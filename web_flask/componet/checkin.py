#!/usr/bin/python3
""" students checkin"""
from web_flask.componet import staff_view
from flask import Blueprint, render_template


@staff_view.route('/studentCheckin')
def student_checkin():
    return render_template('studentCheckin.html')


@staff_view.route('/checkinSummary')
def check_in_summary():
    return render_template('checkinSummary.html')

