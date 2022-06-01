# Hlanganisa

This is the last project for ALX program. Hlanganisa is a Zulu word meaning to connect. through this project we tried to connect our skill to the real world problem

## why the need to build Hlanganisa

Halanganisa is a webApp that will connect service provider people to clients. traders people in our case are small timers like nanys, drivers, plumbers etc. in day to day life there is a high demand for this services however you may not find them easily. through our app the treders could located jobs that are near by them and clients could find the service provider they choose   

## Table of Content
* [Environment](#environment)
* [Installation](#installation)
* [File Descriptions](#file-descriptions)
* [Usage](#usage)
* [Examples of use](#examples-of-use)
* [Bugs](#bugs)
* [Authors](#authors)
* [License](#license)

## Environment
This project is interpreted/tested on VERSION="20.04.4 LTS (Focal Fossa)"

## Installation

* Clone this repository: `git@github.com:DreMukare/hlanganisa.git`
* Access hlanganisa: `cd hlanganisa`
* Install python dependency packages: `pip install -r backend/requirements.txt`
* Access frontend directory: `cd frontend`
* Install frontend dependencies: `npm install`

## File Descriptions

[base_model.py](base_model.py) - Base Model class from which all other models inherit from

- `def __init__(self, *args, **kwargs)` -  Initialization of Base Model instance either through args or kwargs

- ` def __str__(self) -> str` - Returns a string representation of an instance of the
        BaseModel class
- ` def save(self)` - Save an instance to the database
- `def to_dict(self, save_fs=None) -> dict` returns a dict containing all keys/values of the instance
- ` def delete(self)` - Delete the current instance from storage

[db_storage.py](db_storage.py) - interacts with the MySQL database

- `def __init__(self)` - Instantiate a DBStorage object
- `def all(self, cls=None)` - query on the current database session
- `def new(self, obj)` - add the object to the current database session
- `def save(self)` - commit all changes of the current database session
- `def delete(self, obj=None)` - delete from the current database session obj if not None
- `def reload(self)` - reloads data from the database
- ` def close(self)` - call remove() method on the private session attribute
- `def get(self, cls, id)` - Returns the object based on the class name and its ID, or
        None if not found
- `def count(self, cls=None)` - count the number of objects in storage
- `class ImageStorage` - Handles storing and retrieving images
    - `def generate_path(self, type, user_id, root_path, image_no=0) - Generate the path for the image to be stored depending on whether it
           is a profile photo or a work sample photo
    - `def save_image(self, image_size, image_path, image)` - Generates a thumbnail of the required size and saves it at
           the path given
    - `def get_image(self, image_path)` - Retrieve an image from file storage and return it
    - `def process_incoming_image(self, image_file)` - Process an image that's been received from the client"
    - `def get_images(self, image_folder_path)` - Retrieves all the images stored in the directory given
- `class RedisCache` -  Create a redis cache system
   - `def __init__(self)` -  Create an instance of a Redis Client and flush it using flushdb
   - `def store(self, data, expire=timedelta(hours=24)) -> str` -  Store data and return key to access the data
   - `def get(self, key)` - Retrieve a stored value using the given key and returns it as
        a json object
   - `def set_add_logged_in(self, value)` - Add token to set once a user is logged in
   - ` def is_logged_in(self, value)` - Check whether user is logged in
   - ` def remove_logged_in(self, value)` -  Remove token from list of logged_in user tokens
   - ` def flush(self)` - Flush the database to clear everything.
        Used when closing the app		
[post.py](post.py) - Holds class Post, representing different requests and reviews posted by clients

- `class Request(BaseModel, Base)` - Definition of Class Request that represents requests for services made by
    clients
- `class Review(BaseModel, Base)` - Definition of class Review that represents reviews made by users

[user.py](user.py) - Define a User class.

- ` def __repr__(self) -> str` - Basic representation of User
- `def to_dict(self) -> dict` - Return a dict representation of a user based on the type of user
- 

## Bugs
No Known bugs at this time

# Authors
- Eugene Muthui 
- Andrew Mukare
- Kibi Chane
- Millicent Malinga
- Fraol Tesfaye


