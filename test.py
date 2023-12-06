#!/usr/bin/python3
from sqlalchemy import text

from models import storage

from models.staff import Staff

from models.student import Student
user= "arhinbonnah@gmail.com"
user_data = storage.session.query(Staff.id, Staff.password).filter(Staff.email == user).first()
print(user_data[0])
print(user_data[1])