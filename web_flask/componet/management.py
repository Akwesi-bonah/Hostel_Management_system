#!/usr/bin/python3
""" Block and Room management"""

from web_flask.componet import staff_view
from flask import Blueprint, render_template, request, redirect, url_for
from models.block import Block
from models import storage


@staff_view.route('/blocks')
def BlockManage():
    """ display all blocks """
    all_bocks = storage.all(Block).values()
    blocks = [block.to_dict() for block in all_bocks]

    return render_template('manageBlock.html', blocks=blocks)


@staff_view.route('/blocks/add', methods=['GET'], strict_slashes=False)
def new_block():
    """ Add new Block"""
    return render_template('addBlock.html')


@staff_view.route('/blocks', methods=['POST'], strict_slashes=False)
def add_block():
    """ Add new Block"""
    if request.method == 'POST':
        """ Retrieve individual form fields """
        campus = request.form.get('campus')
        name = request.form.get('blockName')
        description = request.form.get('blockDescription')
        status = request.form.get('status')

        if name and description and status and campus:
            # Assuming you have a Block model with these attributes
            try:
                new_block = Block(name=name, description=description, campus=campus, status=status)
                new_block.save()
                return redirect(url_for('staff_view.BlockManage'))
            except Exception as e:
                error_message = "ALll fields are required"
                return render_template('addBlock.html', error=error_message)
        else:
            error_message = "Invalid credentials"
            return render_template('addBlock.html', error=error_message)

    return render_template('addBlock.html')


@staff_view.route('/blocks/edit', methods=['GET'])
def edit_block():
    return render_template('addBlock.html')


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


