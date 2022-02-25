"""
This is the users test cases 

Testing the different user end points
"""


import json
import os
import unittest
from datetime import timedelta
from urllib import response
from api.v1.views.index import status
from api.v1.app import app
from models.db_storage import DBStorage
from api.v1.views.users import get_users
from models import storage
from models.user import User
from models.post import Request, Review
from parameterized import parameterized

 
class TestViewPoints(unittest.TestCase):
    os.environ['ENV'] = 'test'
    @classmethod
    def setUp(self):
       storage.reload()
    
    def tearDown(self):
        return os.environ['ENV']
            
            
    def test_users(self):
        with app.app_context():
            tester = app.test_client(self)
            response = tester.get('/users')
            status_code = response.status_code
            self.assertEqual(status_code, 404)
    
    def test_get_user(self):
        tester = app.test_client(self)
        response = tester.get('api/v1/status')
        print(response.data)
        status_code = response.status_code
        self.assertEqual(status_code, 200)
  
  
    @parameterized.expand([({"id" : "b3ert72c-a974-412c-8e4p-240uy973fchj", 
                             "name" : "Micnhael Bloom", "type": "client", 
                             "email" : "milz@gmail.com", "password":"test" }, 400), 
                           (json.dumps({"id" : "b4ert72c-a974-412c-8e4p-240uy973fchj", 
                             "name" : "Micnhaela Bloom", "type": "client", 
                             "email" : "milz@test.com", "password":"test" }), 201)])
    def test_post_user(self, content, expected, my_headers={"Content-Type": "application/json"}):
        """_summary_

        Args:
            content (_user data_): First tuple contains user data that is none json. and second one is json data
            expected (the expected status code): expected to give 400, and 201 respectively
            my_headers (dict, optional): _description_. Defaults to {"Content-Type": "application/json"}.
        """
        tester = app.test_client(self)      
        response = tester.post('api/v1/users', data = content, headers=my_headers)
        print(response.data)
        self.assertEqual(response.status_code, expected)
        
if __name__ == '__main__':
    unittest.main()