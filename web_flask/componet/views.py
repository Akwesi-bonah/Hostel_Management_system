#!/usr/bin/python3
""" Default staff view"""
from werkzeug.security import check_password_hash

from models.staff import Staff
from web_flask.componet import staff_view
from flask import render_template, request, redirect, url_for, session
import models
from web_flask.forms.login import Login


@staff_view.route('/', methods=['GET', 'POST'])
def base():
    """Default page - Login"""
    form = Login()
    error_message = None

    if form.validate_on_submit():
        session.pop('user_id', None)
        user = form.email.data
        pwd = form.password.data
        hash_pwd = models.storage.get_user_pwd(user)
        user_id = models.storage.get_user_id(user)

        if not user_id or not hash_pwd or not check_password_hash(hash_pwd, pwd):
            error_message = "Invalid credentials"
        else:
            session['user_id'] = user_id
            session['user'] = user
            return redirect(url_for('staff_view.dashboard', user=session['user']))

    return render_template('default.html', form=form, error=error_message)


@staff_view.route('/logout')
def logout():
    session.pop('user_id', None)
    session.pop('user', None)
    return redirect(url_for('staff_view.base'))


@staff_view.route('/user', methods=['GET'])
def dashboard():
    if 'user_id' not in session:
        return redirect(url_for('staff_view.base'))

    user = session['user']

    return render_template('base.html', user=user)

@staff_view.route('/allotment')
def allotment():
    import random

    allotment_data = [
        {
            'id': 1,
            'studName': 'John Doe',
            'Phone': '123-456-7890',
            'Block': 'A',
            'category': 'Regular',
            'RoomType': 'Single',
            'RoomNum': 101,
            'Bill': 500,
            'Paid': 250,
            'Status': 'Paid'
        },
        {
            'id': 2,
            'studName': 'Jane Smith',
            'Phone': '987-654-3210',
            'Block': 'B',
            'category': 'Regular',
            'RoomType': 'Double',
            'RoomNum': 202,
            'Bill': 600,
            'Paid': 300,
            'Status': 'Pending'
        }
    ]

    for i in range(1, 100):
        new_record = {
            'id': i,
            'studName': 'Student' + str(i),
            'Phone': f'{random.randint(100, 999)}-{random.randint(100, 999)}-{random.randint(1000, 9999)}',
            'Block': random.choice(['A', 'B', 'C', 'D']),
            'category': random.choice(['Regular', 'VIP']),
            'RoomType': random.choice(['Single', 'Double']),
            'RoomNum': random.randint(101, 999),
            'Bill': random.randint(400, 800),
            'Paid': random.randint(200, 400),
            'Status': random.choice(['Paid', 'Pending', 'Unpaid'])
        }
        allotment_data.append(new_record)
    return render_template('allotment.html',
                           allotment=allotment_data)


