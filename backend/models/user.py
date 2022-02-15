#!/usr/bin/env python3
"""
Define a User class.
"""
import models
import bcrypt
from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, Text
from sqlalchemy.orm import relationship


class User(BaseModel, Base):
    """
    Definition of User class
    """
    __tablename__ = 'users'
    username = Column(String(60), nullable=False)
    email = Column(String(120), nullable=False)
    password = Column(String(60), nullable=False)
    phone_no = Column(String(20), nullable=True)
    location = Column(String(60), nullable=True)
    rates = Column(Text, nullable=False)
    category = Column(String(20), nullable=False)
    Description = Column(Text, nullable=True)
    profile_image = Column(String(20), nullable=True)
    work_images = Column(String(20), nullable=True)
    post = relationship("Post", backref="user")
    # social_media = Column(String(60), nullable=True)

    def __repr__(self):
        """Basic representation of User"""
        return f"User('{self.username}', '{self.email}', '{self.image_file}')"
