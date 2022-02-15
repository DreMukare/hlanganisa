#!/usr/bin/env python3
"""
Holds class Post, representing different requests and reviews posted by clients
"""
import models
from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, Text, Float


class Post(BaseModel, Base):
    """
    Definition of Class Post that represents reviews and requests made by
    clients
    """
    __tablename__ = 'posts'
    type = Column(String(20), nullable=False)  # could be a review of a service provider, or a request for a service
    content = Column(Text, nullable=False, default="No Content")
    rating = Column(Float)
