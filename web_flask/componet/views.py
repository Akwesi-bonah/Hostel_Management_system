#!/usr/bin/python3

from flask import Blueprint, render_template, request, redirect, url_for

views = Blueprint('views', __name__)


@views.route('/')
def base():
    return render_template('login.html')


@views.route('/user', methods=['GET', 'POST'])
def dashboard():
    user = None
    if request.method == 'POST':
        user = request.form.get('email')
        pwd = request.form.get('password')
        if user == "arhinbonnah@gmail.com" and pwd == "wolf":
            # Redirect to the same route using GET
            return redirect(url_for('views.dashboard', username=user))
        else:
            error_message = "Invalid credentials"
            return render_template('login.html', error=error_message)

    return render_template('base.html',  name=user)


@views.route('/allotment')
def allotment():
    import random

    # Your existing data
    allotment_data = [
        {
            'id': 1,
            'studName': 'John Doe',
            'Phone': '123-456-7890',
            'Block': 'A',
            'category': 'Regular',
            'RoomType': 'Single',
            'RoomNum': 101,
            'Bill': 500,
            'Paid': 250,
            'Status': 'Paid'
        },
        {
            'id': 2,
            'studName': 'Jane Smith',
            'Phone': '987-654-3210',
            'Block': 'B',
            'category': 'Regular',
            'RoomType': 'Double',
            'RoomNum': 202,
            'Bill': 600,
            'Paid': 300,
            'Status': 'Pending'
        }
        # Existing records
    ]

    # Generate 20 new random records
    for i in range(1, 100):  # Start with ID 3 and end with ID 22
        new_record = {
            'id': i,
            'studName': 'Student' + str(i),
            'Phone': f'{random.randint(100, 999)}-{random.randint(100, 999)}-{random.randint(1000, 9999)}',
            'Block': random.choice(['A', 'B', 'C', 'D']),
            'category': random.choice(['Regular', 'VIP']),
            'RoomType': random.choice(['Single', 'Double']),
            'RoomNum': random.randint(101, 999),
            'Bill': random.randint(400, 800),
            'Paid': random.randint(200, 400),
            'Status': random.choice(['Paid', 'Pending', 'Unpaid'])
        }
        allotment_data.append(new_record)



    return render_template('allotment.html', allotment=allotment_data)


