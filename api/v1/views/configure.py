from datetime import datetime

from api.v1.views import views
from models import storage
from models.booking import Booking
from models.configuration import Configuration
from flask import request, jsonify


@views.route('/configure', methods=['POST'])
def set_configuration():
    """Set new configuration"""
    data = request.get_json()
    if not data:
        return jsonify({'error': 'Not JSON'})

    required_fields = ['staff_id', 'expiry_date', 'start_date']
    missing_fields = [field for field in required_fields if field not in data]
    if missing_fields:
        return jsonify({'error': f"{', '.join(missing_fields)} is missing"}), 400

    # Convert date strings to datetime objects for comparison
    start_date = datetime.strptime(data['start_date'], '%Y-%m-%d')
    expiry_date = datetime.strptime(data['expiry_date'], '%Y-%m-%d')

    # Get bookings within the date range
    old_bookings = storage.session.query(Booking).filter(
        Booking.created_at.between(start_date, expiry_date)).all()

    for booking in old_bookings:
        booking.status = 'ended'

    new_config = Configuration(**data)
    storage.session.add(new_config)
    storage.session.commit()

    return jsonify({'message': 'Configuration set successfully'}), 201
