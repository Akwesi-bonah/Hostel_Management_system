#!/usr/bin/python3
""" staff management"""

from web_flask.componet import staff_view
from flask import render_template
from models.staff import Staff
from models import storage


@staff_view.route('/staff')
def  users():
    # Creating dummy data

    users = [
        {"name": "John Doe", "email": "john.doe@example.com", "role": "Manager"},
        {"name": "Jane Smith", "email": "jane.smith@example.com", "role": "Engineer"},
        {"name": "Bob Johnson", "email": "bob.johnson@example.com", "role": "Designer"},
        {"name": "Alice Brown", "email": "alice.brown@example.com", "role": "Analyst"}
    ]
    all_staff = storage.all(Staff).values()
    staff = [staff.to_dict() for staff in all_staff]
    return render_template('manageStaff.html', users=staff)
