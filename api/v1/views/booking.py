#!/usr/bin/python3
"""API Blueprint for booking"""

from api.v1.views import views
from flask import jsonify, abort, request

from models import storage
from models.booking import Booking
from models.room import Room


def validate_booking_data(data):
    """validate required fields"""
    required_fields = ['room_id', 'student_id']

    for field in required_fields:
        if field not in data:
            return False, f"{field.capitalize().replace('_', ' ')} is missing"

    return True, None


@views.route('/booking', methods=['GET'], strict_slashes=False)
def booking():
    """ Get all bookings """
    all_bookings = storage.all(Booking).values()
    bookings = [booking.to_dict() for
                booking in all_bookings]
    return jsonify(bookings)


@views.route('/booking/<booking_id>', methods=['GET'], strict_slashes=False)
def get_booking(booking_id):
    """ Get booking by id """
    booking = storage.get(Booking, booking_id)
    if not booking:
        abort(404)
    return jsonify(booking.to_dict())


@views.route('/booking/<booking_id>', methods=['DELETE'], strict_slashes=False)
def delete_booking(booking_id):
    """ Delete booking by id """
    booking = storage.get(Booking, booking_id)
    if not booking:
        abort(404)
    storage.delete(booking)
    storage.save()
    return jsonify({})


@views.route('/booking', methods=['POST'], strict_slashes=False)
def add_booking():
    """ Create new booking """
    if not request.get_json():
        return jsonify({'error': 'Not JSON'}), 400

    is_valid, error_message = validate_booking_data(request.get_json())
    if not is_valid:
        return jsonify({'error': error_message}), 400
    room_id = request.get_json().get('room_id')
    # student_id = request.get_json().get('student_id')

    avilable_beds = storage.session.query(Room.no_of_beds).filter(Room.id == room_id).scalar()
    if avilable_beds == 0:
        return jsonify({'error': 'No avilable beds'}), 400

    book= {
        'room_id': room_id,
        # 'student_id': student_id,
        'status': 'pending',
        'no_of_beds': avilable_beds - 1,
    }


    booking = Booking(**book)
    booking.save()
    return jsonify(booking.to_dict()), 201


