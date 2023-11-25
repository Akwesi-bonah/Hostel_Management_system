from web_flask.student_model import student_views
from flask import render_template


@student_views.route('/default', methods=['GET'])
def default():
    """
     Display default site student
    """
    return render_template('Sdefault.html')


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

    return render_template('booking.html')


@student_views.route('/default/student/mybooking', methods=['GET'])
def my_bookings():
    """ display student booking infor"""

    return render_template('mybooking.html')


@student_views.route('/default/student/mybooking/details', methods=['GET'])
def booking_details():
    """ display student booking infor"""

    return render_template('details.html')