#!/usr/bin/python3

from flask import render_template, request
from web_flask.componet import staff_view
from models import storage
from web_flask.forms.student import StudentForm


@staff_view.route('/addStudent', methods=['GET', 'POST'])
def add_students():
    """ Add new student """
    form = StudentForm()

    if form.validate_on_submit():
        first_name = form.first_name.data
        last_name = form.last_name.data
        email = form.email.data
        phone = form.phone.data
        guidian = form.guidian.data
        program = form.program.data




    return render_template('addUpdateStudent.html', form=form)


@staff_view.route('/studentsList')
def student_list():
    import random
    import string

    students = []

    # Generate 10 sets of dummy data
    for _ in range(10):
        student = {
            "id": _ + 1,
            "name": ''.join(random.choice(string.ascii_uppercase + string.ascii_lowercase) for _ in range(8)),
            "email": f'email{_}@example.com',
            "phone": ''.join(random.choice(string.digits) for _ in range(10)),
            "guidian": ''.join(random.choice(string.ascii_uppercase + string.ascii_lowercase) for _ in range(8)),
            "program": 'Program X',
            "level": random.choice(['100', '200', '300', '400']),
            "gender": random.choice(['Male', 'Female'])
        }
        students.append(student)
    return render_template('StudentList.html', Students=students)
