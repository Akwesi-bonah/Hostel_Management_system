#!/usr/bin/python3
""" Test .get() and .count() methods
"""
from models import storage
from models.staff import Staff

print("All objects: {}".format(storage.count()))
print("State objects: {}".format(storage.count(Staff)))

first_state_id = list(storage.all(Staff).values())[0].id
print("First state: {}".format(storage.get(Staff, first_state_id)))