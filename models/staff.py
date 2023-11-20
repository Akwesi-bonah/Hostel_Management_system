#!/usr/bin/python3
""" Define Staff class """
from hashlib import md5
from flask_login import UserMixin

from models.base_model import BaseModel, Base
import models
from sqlalchemy import Column, String


class Staff(BaseModel, Base, UserMixin):
    """ Represent staff in hostel """
    if models.storage_t == "db":
        __tablename__ = "staff"
        name = Column(String(128), nullable=False)
        email = Column(String(128), nullable=False)
        phone = Column(String(128), nullable=True)
        password = Column(String(128), nullable=False)
        role = Column(String(128), nullable=False)
        status = Column(String(128), nullable=True)
    else:
        name = ""
        email = ""
        phone = ""
        password = ""
        role = ""
        status = ""

    def __init__(self, *args, **kwargs):
        """initialization of Staff class"""
        super().__init__(*args, **kwargs)

    def __setattr__(self, name, value):
        """sets a password with md5 encryption"""
        if name == "password":
            value = md5(value.encode()).hexdigest()
        super().__setattr__(name, value)


