#!/usr/bin/python3
""" staff management"""

from web_flask.componet import staff_view
from flask import render_template, request, redirect, url_for
from models.staff import Staff
from web_flask.forms.staff import StaffForm
from models import storage


@staff_view.route('/staff', methods=['GET'], strict_slashes=False)
def users():
    """ staff management"""
    form = StaffForm()
    all_staff = storage.all(Staff).values()
    staff = [staff.to_dict() for staff in all_staff]
    return render_template('manageStaff.html',
                           users=staff, form=form)


@staff_view.route('/staff/addEdit', methods=['GET'], strict_slashes=False)
def add_staff():
    """ staff management"""
    form = StaffForm()
    return render_template('addStaff.html', form=form)


@staff_view.route('/staff', methods=['POST'], strict_slashes=False)
def add_user():
    """ Add staff """
    form = StaffForm(request.form)

    if request.method == 'POST' and form.validate():
        campus = form.campus.data
        email = form.staffEmail.data
        pwd = form.userPwd.data
        name = form.staffName.data
        phone = form.staffPhone.data
        role = form.role.data
        status = form.status.data


        try:
            # check if email already exists
            email_check = storage.get_user_id(email)
            print(email_check)
            print(email_check)
            if email_check:
                error_message = "Email already exists"
                return render_template('addStaff.html', form=form, error=error_message)
        except Exception as e:
            print(e)


        try:
            new_staff = Staff(campus=campus, email=email, name=name, password=pwd, phone=phone, role=role, status=status)
            new_staff.save()
            return redirect(url_for('staff_view.users'))  # Redirect upon successful addition
        except Exception as e:
            error_message = e
            return render_template('addStaff.html', form=form, error=error_message)

    # If form validation fails or if the request method is not POST
    return render_template('addStaff.html', form=form)


@staff_view.route('/staff/Edit/<staff_id>', methods=['GET'], strict_slashes=False)
def edit_staff(staff_id):
    """Edit management"""
    staff = storage.get(Staff, staff_id)
    form = StaffForm()
    if staff:
        form.campus.data = staff.campus
        form.staffName.data = staff.name
        form.staffEmail.data = staff.email
        form.staffPhone.data = staff.phone
        form.role.data = staff.role
        form.status.data = staff.status

    return render_template('editStaff.html', form=form)

