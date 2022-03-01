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
    profile_image = Column(Text, nullable=True)
    work_images = Column(String(100), nullable=True)
    rating = Column(Float, nullable=False, default=0.0)
    rating_count = Column(Integer, nullable=False, default=0)

    def __repr__(self) -> str:
        """Basic representation of User"""
        return f"User('{self.username}', '{self.email}', '{self.image_file}')"

    def to_dict(self) -> dict:
        """
        Return a dict representation of a user based on the type of user
        """
        new_dict = super().to_dict()
        del new_dict['password']
        del new_dict['__class__']
        image_path = new_dict.get('profile_image', None)
        if image_path:
            user_profile_image = models.image_storage.get_image(image_path)
            new_dict['profile_image'] = user_profile_image
        else:
            new_dict['profile_image'] = 'No image'

        if new_dict['type'] == 'service provider':
            work_image_path = new_dict.get('work_images', None)
            if work_image_path:
                work_images = models.image_storage.get_images(work_image_path)
                new_dict['work_images'] = work_images
            else:
                new_dict['work_images'] = 'No images'
        if self.type == 'client':
            new_dict.pop('rates', None)
            new_dict.pop('category', None)
            new_dict.pop('description', None)
            new_dict.pop('work_images', None)

        return new_dict
