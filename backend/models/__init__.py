#!/usr/bin/env python3
"""
Initialize the models package
"""
from models.db_storage import DBStorage, ImageStorage, RedisCache


storage = DBStorage()
storage.reload()
image_storage = ImageStorage()
redis_cache = RedisCache()
