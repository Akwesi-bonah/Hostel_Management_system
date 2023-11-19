#!/usr/bin/python3
"""" API Blueprint for students """
from models.student import Student
from models.block import  Block
from models import storage
from api.v1.views import views
from flask import jsonify, abort, request


@views.route('/students', methods=['GET'], strict_slashes=False)
def get_students():
    """ Retrieves the list of all Student objects """
    students = storage.all(Block).values()
    students = [student.to_dict() for student in students]
    return jsonify({"students": students})
