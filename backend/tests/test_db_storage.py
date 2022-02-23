from os import getenv
import os
import unittest
from unittest import mock
from unittest.mock import Mock, patch
from flask import current_app, jsonify, request
from sqlalchemy import create_engine
from datetime import timedelta
from api.v1.views.index import status
from api.v1.app import app



class DBStorage:
    """interacts with the MySQL database"""
    __engine = None
    __session = None

    def __init__(self):
        """Instantiate a DBStorage object"""
        MY_USER = getenv('MY_USER') or 'root'
        PWD = getenv('PWD')
        HOST = getenv('HOST') or '127.0.0.1'
        DB = getenv('DB') or 'hlanganisa'
        ENV = getenv('ENV')
        self.__engine = create_engine('mysql+mysqldb://{}:{}@{}/{}'.
                                      format(MY_USER,
                                             PWD,
                                             HOST,
                                             DB))
        
class TestConnection(unittest.TestCase):
    @mock.patch.dict(os.environ, {'PWD': 'Lethabo2016.'})
    @mock.patch.dict(os.environ, {'DB': 'test'})
    def setUp(self):
        connect_to_mysql = DBStorage()
        connect_to_mysql.__engine = create_engine('mysql+mysqldb://{}:{}@{}/{}')
        self.connected = connect_to_mysql.__engine
        return connect_to_mysql
    
    def tearDown(self):
        if self.connected is not None:
            self.connected = None
    
    def test_status(self):
        with app.app_context():
            response = status()
            # self.assertIn('200', str(status()))
            self.assertEqual(response.status_code, 200)
    

    def test_database(self):
        with app.app_context():
            database = self.setUp()
            self.assertIsInstance(database, DBStorage)
    
        
        
            

if __name__ == '__main__':
    unittest.main()
            
            
            
    