#!/usr/bin/python3
""" staff management"""

from web_flask.componet import staff_view
from flask import render_template, request, redirect, url_for
from models.staff import Staff
from models import storage


@staff_view.route('/staff', methods=['GET'], strict_slashes=False)
def users():
    """ staff management"""
    all_staff = storage.all(Staff).values()
    staff = [staff.to_dict() for staff in all_staff]
    return render_template('manageStaff.html', users=staff)


@staff_view.route('/staff/addEdit', methods=['GET'], strict_slashes=False)
def add_staff():
    """ staff management"""
    return render_template('addStaff.html')


@staff_view.route('/staff', methods=['POST'], strict_slashes=False)
def add_user():
    """ Add staff """
    if request.method == 'POST':
        # Retrieve individual form fields
        campus = request.form.get('campus')
        email = request.form.get('staffEmail')
        pwd = request.form.get('userPwd')
        name = request.form.get('staffName')
        phone = request.form.get('staffPhone')
        role = request.form.get('role')

        if campus and email and pwd and role and name and phone:
            # Assuming you have a Staff model with these attributes
            try:
                new_staff = Staff(campus=campus, email=email, name=name, password=pwd, phone=phone, role=role)
                new_staff.save()
                return redirect(url_for('staff_view.users'))
            except Exception as e:
                error_message = "ALll fields are required"
                return render_template('addStaff.html', error=error_message)
        else:
            error_message = "Invalid credentials"
            return render_template('addStaff.html', error=error_message)


@staff_view.route('/staff/Edit/<staff_id>', methods=['GET'], strict_slashes=False)
def edit_staff(staff_id):
    """ edit management"""
    staff = storage.get(Staff, staff_id)
    name = staff.name
    email = staff.email
    phone = staff.phone
    campus = staff.campus
    role = staff.role
    status = staff.status
    return render_template('editStaff.html', name=name, email=email, phone=phone, campus=campus, role=role,
                           status=status)

