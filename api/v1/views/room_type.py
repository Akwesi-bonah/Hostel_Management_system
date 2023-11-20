#!/usr/bin/python3
""" API Blueprint  for room_type"""
from models.room_type import RoomType
from models import storage
from api.v1.views import views
from flask import jsonify, abort, request


@views.route('/room_type', methods=['GET'], strict_slashes=False)
def get_room_types():
    """ Retrieves the list of all RoomType objects """
    all_room_type = storage.all(RoomType).values()
    room_type = [room_type.to_dict() for room_type in all_room_type]
    return jsonify(room_type)


@views.route('/room_type/<room_type_id>', methods=['GET'], strict_slashes=False)
def get_room_type(room_type_id):
    """Retrieves a room_type"""
    room_type = storage.get(RoomType, room_type_id)
    if not room_type:
        abort(404)

    return jsonify(room_type.to_dict())


@views.route('/room_type/<room_type_id>', methods=['DELETE'], strict_slashes=False)
def delete_room_type(room_type_id):
    """Delete room_type object"""
    room_type = storage.get(RoomType, room_type_id)
    storage.delete(room_type)
    storage.save()

    return jsonify({}), 200


@views.route('/room_type', methods=['POST'], strict_slashes=False)
def add_room_type():
    """create new room_type object"""

    if not request.get_json():
        abort(400, description="Not a JSON")

    if 'name' not in request.get_json():
        abort(400, description="Name missing")

    if 'description' not in request.get_json():
        abort(400, description="Description missing")

    data = request.get_json()
    instance = RoomType(**data)
    instance.save()
    return jsonify(instance.to_dict(), 201)


@views.route('/room_type/<room_type_id>', methods=['PUT'], strict_slashes=False)
def update_room_type(room_type_id):
    """update room_type object"""

    room_type = storage.get(RoomType, room_type_id)
    if not room_type:
        abort(404)

    if not request.get_json():
        abort(400, description="Not a JSON")

    ignore = ['id', 'created_at', 'updated_at']
    data = request.get_json()
    for key, value in data.items():
        if key not in ignore:
            setattr(room_type, key, value)
    storage.save()
    return jsonify(room_type.to_dict()), 200