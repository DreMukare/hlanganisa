from os import getenv
import os
import unittest
from unittest import mock
from unittest.mock import Mock, patch
from urllib import response
from flask import current_app, jsonify, request
from sqlalchemy import create_engine
from datetime import timedelta
from api.v1.views.index import status
from api.v1.app import app
        
class TestConnection(unittest.TestCase):
    
    def test_status(self):
        with app.app_context():
            response = status()
            # self.assertIn('200', str(status()))
            self.assertEqual(response.status_code, 200)
    

    
    
        
        
            

if __name__ == '__main__':
    unittest.main()
            
            
            
    