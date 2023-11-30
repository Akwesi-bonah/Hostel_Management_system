#!/usr/bin/python3
from sqlalchemy import text

from models import storage

from models.staff import Staff

from models.student import Student


student = storage.session.query(Staff).filter_by(id='c5601c44-6204-49a1-9c89-7c4bdf7ac404').first()
print(student)