#!/usr/bin/python3
""" Block and Room management"""
from models.room import Room
from web_flask.componet import staff_view
from flask import Blueprint, render_template, request, redirect, url_for
from models.room_type import RoomType
from models.block import Block
from web_flask.forms.block import AddBlock
from web_flask.forms.room_type import AddRoomType
from web_flask.forms.rooms import RoomForm
from models import storage


@staff_view.route('/blocks')
def BlockManage():
    """ display all blocks """
    all_bocks = storage.all(Block).values()
    blocks = [block.to_dict() for block in all_bocks]

    return render_template('manageBlock.html', blocks=blocks)


@staff_view.route('/blocks/add', methods=['GET'], strict_slashes=False)
def new_block():
    form = AddBlock()
    """ Add new Block"""
    return render_template('addBlock.html', form=form)


@staff_view.route('/blocks', methods=['POST'], strict_slashes=False)
def add_block():
    """Add new Block"""
    form = AddBlock(request.form)  # Create an instance of the Block form

    if request.method == 'POST' and form.validate():
        campus = form.campus.data
        name = form.name.data
        description = form.description.data
        status = form.status.data

        try:
            # Assuming you have a Block model with these attributes
            new_block = Block(name=name, description=description, campus=campus, status=status)
            new_block.save()  # Save the new Block instance
            return redirect(url_for('staff_view.BlockManage'))
        except Exception as e:
            error_message = "All fields are required"
            return render_template('addBlock.html', form=form, error=error_message)

    return render_template('addBlock.html', form=form)


@staff_view.route('/blocks/edit/<block_id>', methods=['GET'], strict_slashes=False)
def edit_block(block_id):
    """Edit Block"""

    block = storage.get(Block, block_id)
    campus = block.campus
    name = block.name
    description = block.description

    form = AddBlock()
    form.campus.data = campus
    form.name.data = name
    form.description.data = description

    return render_template('editBlock.html', form=form)


@staff_view.route('/blocks/update', methods=['PUT'], strict_slashes=False)
def update_block():
    """ Add new Block"""
    return redirect(url_for('staff_view.BlockManage'))


@staff_view.route('/rooms')
def rooms():
    """ display all rooms """
    all_rooms = storage.all(Room).values()
    room = [room.to_dict() for room in all_rooms]

    return render_template('rooms.html', rooms=room)


@staff_view.route('/rooms/add', methods=['GET'], strict_slashes=False)
def room_add():
    """" add room """
    form = RoomForm()
    return render_template('AddRoom.html', form=form)


@staff_view.route('/rooms', methods=['POST'], strict_slashes=False)
def new_room():
    """Add new room"""
    form = RoomForm()

    if form.validate_on_submit():
        # Get the form data
        room_name = form.room_name.data
        gender = form.gender.data
        floor = form.floor.data
        no_of_beds = form.no_of_beds.data
        block_id = form.block.data
        room_type_id = form.room_type.data

        try:
            # Assuming you have a Block model with these attributes
            new_room = Room(room_name=room_name, block_id=block_id,
                             room_type_id=room_type_id, gender=gender,
                             floor=floor, no_of_beds=no_of_beds)
            new_room.save()
            return redirect(url_for('staff_view.BlockManage'))
        except Exception as e:
            error_message = "All fields are required"
            return render_template('addBlock.html', form=form, error=error_message)

    # If the form does not validate, render the form page again with the form and errors
    return render_template('add_room.html', form=form)




@staff_view.route('/roomtype', methods=['GET'], strict_slashes=False)
def room_type():
    """ display all room types """
    all_types = storage.all(RoomType).values()
    types = [room_type.to_dict() for room_type in all_types]

    return render_template('roomType.html', room_type=types)


@staff_view.route('/roomtype', methods=['POST'], strict_slashes=False)
def add_room_type():
    form = AddRoomType(request.form)  # Create an instance of the AddRooType form

    if request.method == 'POST' and form.validate():
        name = form.name.data
        description = form.description.data
        price = form.price.data
        status = form.status.data

        try:
            new_type = RoomType(name=name, description=description, price=price, status=status)
            new_type.save()
            return redirect(url_for('staff_view.room_type'))
        except Exception as e:
            error_message = "Error occurred while adding room type"
            return render_template('AddRoom.html', form=form, error=error_message)

    return render_template('AddRoom.html', form=form)


@staff_view.route('/roomtype/add')
def room_type_add():
    form = AddRoomType()
    """" add or edit room type """
    return render_template('addRoomType.html', form=form)


@staff_view.route('/roomtype/edit<room_type_id>', methods=['GET'], strict_slashes=False)
def room_type_edit(room_type_id):
    room_types = storage.get(RoomType, room_type_id)  # Retrieve RoomType instead of Block
    if room_types:
        form = AddRoomType()
        form.name.data = room_types.name
        form.description.data = room_types.description
        form.price.data = float(room_types.price)


        return render_template('editRoomType.html', form=form)


@staff_view.route('/configure')
def configure():
    return render_template('configure.html')


@staff_view.route('/expiry')
def expiry():
    return render_template('expiry.html')


