#!/usr/bin/python3

from flask import Blueprint, render_template, session, redirect, url_for

import models
from models.staff import Staff
from web_flask.componet import staff_view
from web_flask.forms.staff import StaffForm


@staff_view.route('/user/profile')
def profile_info():
    form = StaffForm()
    user = None
    if 'user' not in session:
        return redirect(url_for('staff_view.base'))
    else:
        try:
            id = session['user_id']
            user = models.storage.get(Staff, id)
            user = user.to_dict()

            form.campus.data = user['campus']
            form.staffName.data = user['name']
            form.staffEmail.data = user['email']
            form.staffPhone.data = user['phone']
        except Exception as e:
            pass

        return render_template('profile.html', user=user , form=form)
