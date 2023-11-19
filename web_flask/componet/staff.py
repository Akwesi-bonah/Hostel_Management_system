#!/usr/bin/python3


from flask import Blueprint, render_template,jsonify
staff = Blueprint('staff', __name__)

from models.staff import Staff
from models import storage


@staff.route('/staff')
def  users():
    # Creating dummy data

    users = [
        {"name": "John Doe", "email": "john.doe@example.com", "role": "Manager"},
        {"name": "Jane Smith", "email": "jane.smith@example.com", "role": "Engineer"},
        {"name": "Bob Johnson", "email": "bob.johnson@example.com", "role": "Designer"},
        {"name": "Alice Brown", "email": "alice.brown@example.com", "role": "Analyst"}
    ]
    all = storage.all(Staff).values()
    list_users = []
    for user in all:
        list_users.append(user.to_dict())
    jsonify(list_users)
    return render_template('manageStaff.html', users=list_users)
