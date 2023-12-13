#!/usr/bin/python3
from sqlalchemy import text, func, and_

import models
from models import storage
from models.block import Block
from models.booking import Booking
from models.room import Room
from models.room_type import RoomType

from models.staff import Staff

from models.student import Student

student_email = storage.session.query(Student.email).all()
print(student_email)

