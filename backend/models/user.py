#!/usr/bin/env python3
"""
Define a User class.
"""
import models
import bcrypt
from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, Text, Float, Integer
from sqlalchemy.orm import relationship


class User(BaseModel, Base):
    """
    Definition of User class
    """
    __tablename__ = 'users'
    name = Column(String(100), nullable=False)
    email = Column(String(120), nullable=False)
    password = Column(String(60), nullable=False)
    type = Column(String(20), nullable=False)
    phone_no = Column(String(20), nullable=True)
    location = Column(String(60), nullable=True)
    rates = Column(Text, nullable=False, default='0')
    category = Column(String(20), nullable=False, default='other')
    description = Column(Text, nullable=True)
    profile_image = Column(String(100), nullable=True)
    work_images = Column(String(100), nullable=True)
    rating = Column(Float, nullable=False, default=0.0)
    #rating_count = Column(Integer)
    post = relationship("Post", backref="user")
    # social_media = Column(String(60), nullable=True)

    def __repr__(self) -> str:
        """Basic representation of User"""
        return f"User('{self.username}', '{self.email}', '{self.image_file}')"

    def to_dict(self) -> dict:
        """
        Return a dict representation of a user based on the type of user
        """
        new_dict = super().to_dict()
        del new_dict['password']
        if self.type == 'client':
            new_dict.pop('rates', None)
            new_dict.pop('category', None)
            new_dict.pop('description', None)
            new_dict.pop('work_images', None)

        return new_dict
