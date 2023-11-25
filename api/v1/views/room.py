#!/usr/bin/python3
""" API Blueprint  for Room"""
from api.v1.views import views
from flask import jsonify, abort, request
from models.room import Room
from models import storage


@views.route('/room', methods=['GET'], strict_slashes=False)
def room():
    """ Get all rooms """
    all_rooms = storage.all(Room).values()
    rooms = [room.to_dict() for room in all_rooms]
    return jsonify(rooms)


@views.route('/room/<room_id>', methods=['GET'], strict_slashes=False)
def get_room(room_id):
    """ Get room by id """
    room = storage.get(Room, room_id)
    if not room:
        abort(404)
    return jsonify(room.to_dict())


@views.route('/room/<room_id>', methods=['DELETE'], strict_slashes=False)
def delete_room(room_id):
    """ Delete room by id """
    room = storage.get(Room, room_id)
    if not room:
        abort(404)
    storage.delete(room)
    storage.save()
    return jsonify({})


@views.route('/room', methods=['POST'], strict_slashes=False)
def add_room():
    """ Create new room """
    if not request.get_json():
        abort(400, description="Not a JSON")
    if 'room_name' not in request.get_json():
        abort(400, description="Name missing")
    if 'room_type_id' not in request.get_json():
        abort(400, description="room type ID missing")
    if 'block_id' not in request.get_json():
        abort(400, description="Block id missing")

    if 'no_of_beds' not in request.get_json():
        abort(400, description="Block id missing")

    data = request.get_json()
    instance = Room(**data)
    instance.save()
    return jsonify(instance.to_dict())


@views.route('/room/<room_id>', methods=['PUT'], strict_slashes=False)
def update_room(room_id):
    """ Update room by id """
    room = storage.get(Room, room_id)
    if not room:
        abort(404)
    if not request.get_json():
        abort(400, description="Not a JSON")
    ignore = ['id', 'created_at', 'updated_at']
    data = request.get_json()
    for key, value in data.items():
        if key not in ignore:
            setattr(room, key, value)
    room.save()
    return jsonify(room.to_dict())



