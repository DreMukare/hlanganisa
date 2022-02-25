#!/usr/bin/env python3
"""Flask configuration"""
from os import environ, path
from dotenv import load_dotenv

basedir = path.abspath(path.dirname(__file__))
load_dotenv(path.join(basedir, '.env'))


class Config:
    """Base Flask config variables"""
    SECRET_KEY = environ.get('SECRET_KEY')
    JSONIFY_PRETTYPRINT_REGULAR = environ.get('JSONIFY_PRETTYPRINT_REGULAR')


class DevConfig(Config):
    """Development environment config variables"""
    FLASK_ENV = 'development'
    DEBUG = True


class ProdConfig(Config):
    """Production environment config variables"""
    FLASK_ENV = 'production'
    DEBUG = False
    TESTING = False
