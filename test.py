#!/usr/bin/python3
from models import storage

from models.staff import Staff


data = storage.get_user_phone('45647646775')
print(data)