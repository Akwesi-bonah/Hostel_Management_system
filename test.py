#!/usr/bin/python3
from sqlalchemy import text, func

import models
from models import storage
from models.block import Block
from models.booking import Booking
from models.room import Room
from models.room_type import RoomType

from models.staff import Staff

from models.student import Student

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
for booking in allotment_tuple:
    (booking_id, paid, student_number, phone, name, block_name,
     room_no, room_type, price, status) = booking

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
print(len(allotment_list))
