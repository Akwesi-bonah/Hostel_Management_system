#!/usr/bin/python3
""" Define Payment class """
import models
from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, Numeric

class Payment(BaseModel, Base):
    """Represent payment in hostel"""
    if models.storage_t == "db":
        __tablename__ = "payments"
        student_number = Column(String(128), nullable=False)
        room_name = Column(String(128), nullable=False)
        amount = Column(Numeric(6,2), nullable=False)

    else:
        student_number = ""
        room_name = ""
        amount = 0

    def __init__(self,*args, **kwargs):
        """ initializing payment class """
        super().__init__(*args, **kwargs)

