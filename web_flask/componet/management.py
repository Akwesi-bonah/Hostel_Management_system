#!/usr/bin/python3
""" Block and Room management"""

from web_flask.componet import staff_view
from flask import Blueprint, render_template
from models.block import Block
from models import storage


@staff_view.route('/block')
def BlockManage():
    blocks = [
        {
            "id": 1,
            "campus": "Campus A",
            "name": "Block 1",
            "description": "This is the first block."
        },
        {
            "id": 2,
            "campus": "Campus B",
            "name": "Block 2",
            "description": "A description for block 2."
        },
        {
            "id": 3,
            "campus": "Campus C",
            "name": "Block 3",
            "description": "The third block's description."
        },
        {
            "id": 4,
            "campus": "Campus A",
            "name": "Block 4",
            "description": "Description for block 4."
        }
    ]

    return render_template('manageBlock.html', blocks=blocks)


@staff_view.route('/block/edit')
def edit_block():
    return render_template('addEditBlock.html')


@staff_view.route('/rooms')
def rooms():
    blocks = [
        {
            "category": "Dormitory",
            "room_type": "Double",
            "Block": "A",
            "room_name": "A101",
            "description": "Double room with a view.",
            "capacity": 2,
            "Gender": "Mixed",
            "floor": 1,
            "beds_alv": 2
        },
        {
            "category": "Apartment",
            "room_type": "Single",
            "Block": "B",
            "room_name": "B201",
            "description": "Single room with a kitchenette.",
            "capacity": 1,
            "Gender": "Male",
            "floor": 2,
            "beds_alv": 1
        },
        {
            "category": "Dormitory",
            "room_type": "Triple",
            "Block": "C",
            "room_name": "C301",
            "description": "Triple room with shared bathroom.",
            "capacity": 3,
            "Gender": "Female",
            "floor": 3,
            "beds_alv": 3
        },
        {
            "category": "Suite",
            "room_type": "Queen",
            "Block": "D",
            "room_name": "D401",
            "description": "Luxurious suite with a queen-sized bed.",
            "capacity": 2,
            "Gender": "Mixed",
            "floor": 4,
            "beds_alv": 2
        },
        {
            "category": "Apartment",
            "room_type": "Double",
            "Block": "E",
            "room_name": "E501",
            "description": "Spacious apartment for two.",
            "capacity": 2,
            "Gender": "Mixed",
            "floor": 5,
            "beds_alv": 2
        },
        {
            "category": "Dormitory",
            "room_type": "Single",
            "Block": "F",
            "room_name": "F601",
            "description": "Basic single room.",
            "capacity": 1,
            "Gender": "Female",
            "floor": 6,
            "beds_alv": 1
        },
        {
            "category": "Suite",
            "room_type": "King",
            "Block": "G",
            "room_name": "G701",
            "description": "A spacious suite with a king-sized bed.",
            "capacity": 2,
            "Gender": "Male",
            "floor": 7,
            "beds_alv": 2
        },
        {
            "category": "Apartment",
            "room_type": "Double",
            "Block": "H",
            "room_name": "H801",
            "description": "Cozy apartment for two people.",
            "capacity": 2,
            "Gender": "Mixed",
            "floor": 8,
            "beds_alv": 2
        },
        {
            "category": "Dormitory",
            "room_type": "Single",
            "Block": "I",
            "room_name": "I901",
            "description": "A simple single room.",
            "capacity": 1,
            "Gender": "Mixed",
            "floor": 9,
            "beds_alv": 1
        },
        {
            "category": "Suite",
            "room_type": "Queen",
            "Block": "J",
            "room_name": "J1001",
            "description": "Comfortable suite with a queen-sized bed.",
            "capacity": 2,
            "Gender": "Mixed",
            "floor": 10,
            "beds_alv": 2
        }
    ]
    return render_template('rooms.html', rooms=blocks)


@staff_view.route('/rooms/add')
def room_add():
    return render_template('AddEditRooms.html')


@staff_view.route('/roomtype', methods=['GET'], strict_slashes=False)
def room_type():
    """ display all room types """
    dummy_room_types = [
        {
            "name": f"Room Type {i}",
            "description": f"Description for Room Type {i}",
            "price": 100 + i * 10,
            "status": "active" if i % 2 == 0 else "inactive"
        }
        for i in range(1, 11)
    ]
    return render_template('roomType.html', room_type=dummy_room_types)


@staff_view.route('/roomtype/add_edit')
def room_type_add_edit():
    """" add or edit room type """
    return render_template('addEditRoomType.html')


@staff_view.route('/configure')
def configure():
    return render_template('configure.html')


@staff_view.route('/expiry')
def expiry():
    return render_template('expiry.html')


