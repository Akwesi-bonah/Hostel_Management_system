#!/usr/bin/python3
"""Define Booking class"""
import models
from models.base_model import BaseModel, Base
from sqlalchemy import Column, String


class Booking(BaseModel, Base):
    """Represent booking in hostel"""
    if models.storage_t == "db":
        __tablename__ = "bookings"
        room_name = Column(String(128), nullable=False)
        room_type = Column(String(128), nullable=False)
        paid = Column(String(128), nullable=False)
        status = Column(String(128), nullable=False)
    else:
        room_name = ""
        room_type = ""
        paid = ""
        status = ""

    def __init__(self, *args, **kwargs):
        """initialize booking class"""
        super().__init__(*args, **kwargs)

