#!/usr/bin/python3
""" staff management"""

from web_flask.componet import staff_view
from flask import render_template
from models.staff import Staff
from models import storage


@staff_view.route('/staff')
def users():
    """ staff management"""
    all_staff = storage.all(Staff).values()
    staff = [staff.to_dict() for staff in all_staff]
    return render_template('manageStaff.html', users=staff)


@staff_view.route('/staff/addEdit')
def add_edit_staff():
    """ staff management"""
    return render_template('addEditStaff.html')
