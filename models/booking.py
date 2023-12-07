#!/usr/bin/python3
"""Define Booking class"""
from sqlalchemy.orm import relationship

import models
from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, ForeignKey


class Booking(BaseModel, Base):
    """Represent booking in hostel"""
    if models.storage_t == "db":
        __tablename__ = "bookings"
        room_id = Column(String(60), ForeignKey('rooms.id',  ondelete="CASCADE"), nullable=False)
        student_id = Column(String(60), ForeignKey('students.id',  ondelete="CASCADE"), nullable=False)
        paid = Column(String(128), default=0)
        status = Column(String(128), default="pending")

    else:
        room_name = ""
        room_type = ""
        paid = ""
        status = ""

    def __init__(self, *args, **kwargs):
        """initialize booking class"""
        super().__init__(*args, **kwargs)

