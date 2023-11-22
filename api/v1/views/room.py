#!/usr/bin/python3
""" API Blueprint  for Room"""
from api.v1.views import views
from flask import jsonify, abort, request
from models.room import Room
from models import storage


@views.route('/rooms', methods=['GET'], strict_slashes=False)
def room():
    """ Get all rooms """
    all_rooms = storage.all(Room).values()
    rooms = [room.to_dict() for room in all_rooms]
    return jsonify(rooms)

