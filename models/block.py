#!/usr/bin/python3
""" Define Block class """
import models
from models.base_model import BaseModel, Base
from sqlalchemy import Column, String


class Block(BaseModel, Base):
    """ Represent block in hostel """
    if models.storage_t == "db":
        __tablename__ = "blocks"
        campus = Column(String(128), nullable=False)
        name = Column(String(128), nullable=True)
        description = Column(String(128), nullable=True)
    else:
        campus = ""
        name = ""
        description = ""

    def __init__(self, *args, **kwargs):
        """ Initialization of the block """
        super().__init__(*args, **kwargs)

    