from flask import jsonify, abort, request
from sqlalchemy import and_

from api.v1.views import views
from models import storage
from models.booking import Booking
from models.room import Room


def validate_booking_data(data):
    required_fields = ['room_id', 'student_id']
    for field in required_fields:
        if field not in data:
            return False, f"{field.replace('_', ' ').capitalize()} is missing"
    return True, None


@views.route('/bookings', methods=['GET'], strict_slashes=False)
def get_all_bookings():
    all_bookings = [booking.to_dict() for booking in storage.all(Booking).values()]
    return jsonify(all_bookings)


@views.route('/booking/<booking_id>', methods=['GET'], strict_slashes=False)
def get_booking_by_id(booking_id):
    booking = storage.get(Booking, booking_id)
    if not booking:
        abort(404)
    return jsonify(booking.to_dict())


@views.route('/booking/<booking_id>', methods=['DELETE'], strict_slashes=False)
def delete_booking_by_id(booking_id):
    booking = storage.get(Booking, booking_id)
    if not booking:
        abort(404)
    storage.delete(booking)
    storage.save()
    return jsonify({})


@views.route('/booking', methods=['POST'], strict_slashes=False)
def create_booking():
    if not request.is_json:
        return jsonify({'error': 'Request data is not in JSON format'}), 400

    booking_data = request.get_json()
    is_valid, error_message = validate_booking_data(booking_data)
    if not is_valid:
        return jsonify({'error': error_message}), 400

    room_id = booking_data.get('room_id')
    student_id = booking_data.get('student_id')

    existing_booking = storage.session.query(Booking).filter(
        and_(
            Booking.student_id == student_id,
            Booking.status == 'pending'
        )
    ).first()

    if existing_booking:
        return jsonify({'error': 'You have already booked a room'}), 400

    available_beds = storage.session.query(Room.booked_beds).filter(Room.id == room_id).scalar()
    if available_beds == 0:
        return jsonify({'error': 'No available beds'}), 400

    new_booking = {
        'room_id': room_id,
        'student_id': student_id,
        'status': 'pending',
        'no_of_beds': int(available_beds) - 1,
    }
    booking = Booking(**new_booking)
    booking.save()
    return jsonify(booking.to_dict()), 201
