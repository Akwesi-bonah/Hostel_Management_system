#!/usr/bin/python3
""" Define Student class """

from models.base_model import BaseModel, Base
import models
from sqlalchemy import Column, String, Date


class Student(BaseModel, Base):
    """Represent student in hostel"""

    if models.storage_t == "db":
        __tablename__ = "students"
        full_name = Column(String(128), nullable=False)
        date_of_birth = Column(Date, nullable=False)
        gender = Column(String(128), nullable=False)
        student_number = Column(String(128), nullable=False)
        program = Column(String(128), nullable=False)
        level = Column(String(128), nullable=False)
        email = Column(String(128), nullable=False)
        address = Column(String(128), nullable=False)
        phone = Column(String(128), nullable=False)
        guardian_name = Column(String(128), nullable=False)
        guardian_phone = Column(String(128), nullable=False)
        password = Column(String(128), nullable=False)
        disability = Column(String(128), nullable=False)
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

