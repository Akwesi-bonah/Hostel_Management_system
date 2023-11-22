#!/usr/bin/python3
""" Define Rooms class """
import models
from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, ForeignKey, Integer


class Room(BaseModel, Base):
    """ Represent room in hostel """
    if models.storage_t == "db":
        __tablename__ = "rooms"
        block_id = Column(String(255), ForeignKey('blocks.id'), nullable=False)
        room_type_id = Column(String(255), ForeignKey('room_types.id'), nullable=False)
        room_name = Column(String(128), nullable=False)
        gender = Column(String(128), nullable=False)
        floor = Column(String(128), nullable=False)
        no_of_beds = Column(Integer, nullable=False)
    else:
        block = ""
        room_type = ""
        room_name = ""
        gender = ""
        floor = ""
        no_of_beds = 0

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

