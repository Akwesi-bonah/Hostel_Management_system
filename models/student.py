#!/usr/bin/python3
""" Define Student class """

from models.base_model import BaseModel, Base
import models
from sqlalchemy import Column, String, Date


class Student(BaseModel, Base):
    """Represent student in hostel"""

    if models.storage_t == "db":
        __tablename__ = "students"
        first_name = Column(String(128), nullable=False)
        last_name = Column(String(128), nullable=False)
        other_name = Column(String(128))
        date_of_birth = Column(Date, nullable=False)
        gender = Column(String(128), nullable=False)
        student_number = Column(String(128), unique=True)
        program = Column(String(128))
        level = Column(String(128))
        email = Column(String(128), unique=True)
        address = Column(String(128))
        phone = Column(String(128), unique=True)
        guardian_name = Column(String(128))
        guardian_phone = Column(String(128))
        password = Column(String(128))
        disability = Column(String(128))
    else:
        full_name = ""
        date_of_birth = ""
        gender = ""
        student_number = ""
        program = ""
        level = ""
        email = ""
        address = ""
        phone = ""
        guardian_name = ""
        guardian_phone = ""
        password = ""
        disability = ""


def __init__(self, *args, **kwargs):
        """initialization of Student class"""
        super().__init__(*args, **kwargs)
        self.full_name = ""
        self.date_of_birth = ""
        self.gender = ""
        self.student_number = ""
        self.program = ""
        self.level = ""
        self.email = ""
        self.address = ""
        self.phone = ""
        self.guardian_name = ""
        self.guardian_phone = ""
        self.password = ""
        self.disability = ""

