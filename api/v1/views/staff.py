#!/usr/bin/python3
"""" API Blueprint for staff """
from models import storage
from models.staff import Staff
from api.v1.views import views
from flask import jsonify, abort, request, make_response


@views.route('/staff', methods=['GET'], strict_slashes=False)
def get_staffs():
    """ Retrieves the list of all Staff objects """
    all_staff = storage.all(Staff).values()
    staff = [staff.to_dict() for staff in all_staff]
    return jsonify(staff)


@views.route('/staff/<staff_id>', methods=['GET'], strict_slashes=False)
def get_staff(staff_id):
    """Retrieves a staff"""
    staff = storage.get(Staff, staff_id)
    if not Staff:
        abort(404)

    return jsonify(staff.to_dict())


@views.route('/staff/<staff_id>', methods=['DELETE'], strict_slashes=False)
def delete_staff(staff_id):
    """Delete staff object"""
    staff = storage.get(Staff, staff_id)
    storage.save()

    return make_response(jsonify({}), 200)


@views.route('/staff', methods=['POST'], strict_slashes=False)
def add_staff():
    """create new staff object"""

    if not request.get_json():
        abort(400, description="Not a JSON")

    if 'name' not in request.get_json():
        abort(400, description="Name missing")

    if 'email' not in request.get_json():
        abort(400, description="Name missing")

    if 'password' not in request.get_json():
        abort(400, description="Password missing")

    if 'role' not in request.get_json():
        abort(400, description="Name missing")

    data = request.get_json()
    instance = Staff(**data)
    instance.save()
    return make_response(jsonify(instance.to_dict()), 201)


@views.route('/staff/<staff_id>', methods=['PUT'], strict_slashes=False)
def update_staff(staff_id):
    """Update a staff"""

    if not request.get_json():
        abort(400, description="Not a JSON")

    staff = storage.get(Staff, staff_id)
    if not Staff:
        abort(404)

    ignore = ['id',  'created_at', 'updated_at']

    data = request.get_json()
    for key, value in data.items():
        if key not in ignore:
            setattr(staff, key, value)
    storage.save()
    return make_response(jsonify(staff.to_dict()), 200)
