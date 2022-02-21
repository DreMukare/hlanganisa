#!/usr/bin/env python3
"""
Holds class Post, representing different requests and reviews posted by clients
"""
import models
from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, Text, Float, ForeignKey
from sqlalchemy.orm import relationship


class Request(BaseModel, Base):
    """
    Definition of Class Request that represents requests for services made by
    clients
    """
    __tablename__ = 'requests'
    # could be a review of a service provider, or a request for a service
    content = Column(Text, nullable=False)
    category = Column(String(20), nullable=False)
    user_id = Column(String(60), ForeignKey('users.id'), nullable=False)
    user = relationship('User', backref='requests')
    status = Column(String(20), nullable=False)


class Review(BaseModel, Base):
    """
    Definition of class Review that represents reviews made by users
    """
    __tablename__ = 'reviews'
    user_id = Column(String(60), ForeignKey('users.id'), nullable=False)
    user = relationship('User', foreign_keys=[user_id])
    reviewee_id = Column(String(60), ForeignKey('users.id'), nullable=False)
    reviewee = relationship('User', foreign_keys=[reviewee_id])
    content = Column(Text, nullable=False)
    rating = Column(Float, default=0.0)
