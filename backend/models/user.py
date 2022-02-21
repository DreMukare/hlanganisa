#!/usr/bin/env python3
"""
Define a User class.
"""
import datetime

import jwt
from api.v1 import app
import models
import bcrypt
from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, Text, Float
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

    def encode_auth_token(self, user_id):
        """
    Generates the Auth Token
    :return: string
    """
        try:
            payload = {
                'sub': self.user_id,
                'iat': datetime.datetime.utcnow(),
                'jti': self.email,
                'exp': datetime.datetime.utcnow() + datetime.timedelta(days=0, hours=4),
 
            }
            return jwt.encode(
                payload,
                app.config.get('SECRET_KEY'),
                algorithm='HS256'
            )
        except:
            return {'message': "Failed to authenticate"}
