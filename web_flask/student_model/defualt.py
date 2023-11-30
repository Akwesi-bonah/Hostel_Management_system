from web_flask.forms.student import StudentForm
from web_flask.student_model import student_views
from flask import render_template
from models import storage
from models.room import  Room
from models.block import Block
from models.room_type import RoomType


@student_views.route('/default', methods=['GET'])
def default():
    """
     Display default site student
    """
    #login = LoginForm()
    form = StudentForm()

    return render_template('Sdefault.html', form=form)


@student_views.route('/default/student', methods=['GET'])
def dashboard():
    return render_template('Sbase.html')


@student_views.route('/default/student/profile', methods=['GET'])
def student_profile():
    """Student profile"""

    return render_template('Sprofile.html')


@student_views.route('/default/student/booking', methods=['GET'])
def booking():
    """ booking for rooms"""
    block = storage.all(Block).values()
    blocks = [block.to_dict() for block in block]
    room_types = storage.all(RoomType).values()
    room_type = [room_type.to_dict() for room_type in room_types]

    room = (storage.session.query(Room.id, Room.room_name, Room.booked_beds, Room.floor, Room.gender,
                                   RoomType.name.label('room_type_name'), RoomType.price,
                                   Block.name.label('block_name'))
             .join(Block, Room.block_id == Block.id)
             .join(RoomType, Room.room_type_id == RoomType.id)
             .all())

    rooms = []
    for result_tuple in room:
        id, room_name, no_of_beds, floor, gender, room_type_name,price, block_name = result_tuple

        result_dict = {
            'id': id,
            'room_name': room_name,
            'no_of_beds': no_of_beds,
            'floor': floor,
            'gender': gender,
            'room_type_name': room_type_name,
            'price': price,
            'block_name': block_name
        }

        rooms.append(result_dict)

    return render_template('booking.html', blocks=block,
                           room_types=room_type,
                           rooms=rooms)


@student_views.route('/default/student/mybooking', methods=['GET'])
def my_bookings():
    """ display student booking infor"""

    return render_template('mybooking.html')


@student_views.route('/default/student/mybooking/details', methods=['GET'])
def booking_details():
    """ display student booking infor"""

    return render_template('details.html')