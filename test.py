#!/usr/bin/python3
from sqlalchemy import text

from models import storage

from models.staff import Staff

from models.student import Student


student = storage.get_id()
print(student)