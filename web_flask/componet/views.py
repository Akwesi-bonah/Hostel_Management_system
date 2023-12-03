#!/usr/bin/python3
""" Default staff view"""
from sqlalchemy import func
from werkzeug.security import check_password_hash

from models.block import Block
from models.booking import Booking
from models.room import Room
from models.room_type import RoomType
from models.staff import Staff
from models.student import Student
from web_flask.componet import staff_view
from flask import render_template, request, redirect, url_for, session
import models
from web_flask.forms.login import Login


@staff_view.route('/', methods=['GET', 'POST'])
def landing_page():
    """landing page for the project"""
    return render_template('landingPage.html')


@staff_view.route('/login', methods=['GET', 'POST'])
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
    session.clear()
    return redirect(url_for('staff_view.base'))


@staff_view.route('/user', methods=['GET'])
def dashboard():
    if 'user_id' not in session:
        return redirect(url_for('staff_view.base'))

    user = session['user']

    total_beds = models.storage.session.query(func.sum(Room.no_of_beds)).scalar()
    total_rooms = models.storage.session.query(func.count(Room.id)).scalar()
    female_beds = (
        models.storage.session.query(func.sum(Room.no_of_beds))
        .filter(Room.gender == 'female')
        .scalar()
    )
    male_beds = (
        models.storage.session.query(func.sum(Room.no_of_beds))
        .filter(Room.gender == 'male')
        .scalar()
    )
    return render_template('base.html', user=user,
                           total_beds=total_beds, total_rooms=total_rooms,
                           female_beds=female_beds, male_beds=male_beds)


@staff_view.route('/allotment')
def allotment():
    if 'user_id' not in session:
        return redirect(url_for('staff_view.base'))
    user = session['user']

    allotment_tuple = (
        models.storage.session.query(
            Booking.id,
            Booking.paid,
            Student.student_number,
            Student.phone,
            func.concat(
                Student.first_name,
                ' ',
                Student.last_name
            ).label('full_name'),
            Block.name,
            Room.room_name,
            RoomType.name,
            RoomType.price,
            Booking.status
        )
        .join(Student, Booking.student_id == Student.id)
        .join(Room, Booking.room_id == Room.id)
        .join(Block, Room.block_id == Block.id)
        .join(RoomType, Room.room_type_id == RoomType.id)
        .all()
    )

    allotment_list = []
    for allot in allotment_tuple:
        (booking_id, paid, student_number,phone, name, block_name,
         room_no, room_type, price, status) = allot

        result_tuple = {
            'booking_id': booking_id,
            'paid': paid,
            'student_number': student_number,
            'phone': phone,
            'student_name': name,
            'block_name': block_name,
            'room_no': room_no,
            'room_type': room_type,
            'price': price,
            'status': status
        }
        allotment_list.append(result_tuple)
    return render_template('allotment.html',
                           allotment=allotment_list, user=user)

