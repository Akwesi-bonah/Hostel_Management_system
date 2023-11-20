#!/usr/bin/python3
""" Define Rooms class """
import models
from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, ForeignKey


class Room(BaseModel, Base):
    """ represent room in hostel """
    if models.storage_t == "db":
        __tablename__ = "rooms"
        block = Column(String(128), nullable=False)
        room_type = Column(String(128), nullable=False)
        room_name = Column(String(128), nullable=False)
        gender = Column(String(128), nullable=False)
        floor = Column(String(128), nullable=False)
        no_of_beds = Column(String(128), nullable=False)
    else:
        block = ""
        room_type = ""
        room_name = ""
        gender = ""
        floor = ""
        no_of_beds = 0

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

