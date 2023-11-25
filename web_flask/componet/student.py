#!/usr/bin/python3

from flask import render_template
from web_flask.componet import staff_view
from models import storage


@staff_view.route('/addStudent')
def add_students():
    return render_template('addUpdateStudent.html')


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
