#!/usr/bin/env python3
"""
Initialize the models package
"""
from models.db_storage import DBStorage


storage = DBStorage()
storage.reload()
