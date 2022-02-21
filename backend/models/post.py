#!/usr/bin/env python3
"""
Holds class Post, representing different requests and reviews posted by clients
"""
import models
from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, Text, Float, ForeignKey


class Post(BaseModel, Base):
    """
    Definition of Class Post that represents reviews and requests made by
    clients
    """
    __tablename__ = 'posts'
    # could be a review of a service provider, or a request for a service
    type = Column(String(20), nullable=False)
    content = Column(Text, nullable=False, default="No Content")
    rating = Column(Float, default=0.0)
    user_id = Column(String(60), ForeignKey('users.id'), nullable=False)
    #other_id = Column(String(60), ForeignKey('users.id'), nullable=False)
