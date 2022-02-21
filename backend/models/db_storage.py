import io
import json
import redis
import uuid
import base64
import models
from datetime import timedelta
from PIL import Image
from models.base_model import BaseModel, Base
from models.user import User
from models.post import Review, Request
from os import getenv, path, listdir
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker

classes = {"User": User, "Review": Review, "Request": Request}


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
        if ENV == "test":
            Base.metadata.drop_all(self.__engine)

    def all(self, cls=None):
        """query on the current database session"""
        new_dict = {}
        for clss in classes:
            if cls is None or cls is classes[clss] or cls is clss:
                objs = self.__session.query(classes[clss]).all()
                for obj in objs:
                    key = obj.__class__.__name__ + '.' + obj.id
                    new_dict[key] = obj
        return (new_dict)

    def new(self, obj):
        """add the object to the current database session"""
        self.__session.add(obj)

    def save(self):
        """commit all changes of the current database session"""
        self.__session.commit()

    def delete(self, obj=None):
        """delete from the current database session obj if not None"""
        if obj is not None:
            self.__session.delete(obj)

    def reload(self):
        """reloads data from the database"""
        Base.metadata.create_all(self.__engine)
        sess_factory = sessionmaker(bind=self.__engine, expire_on_commit=False)
        Session = scoped_session(sess_factory)
        self.__session = Session

    def close(self):
        """call remove() method on the private session attribute"""
        self.__session.remove()

    def get(self, cls, id):
        """
        Returns the object based on the class name and its ID, or
        None if not found
        """
        if cls not in classes.values():
            return None

        all_cls = models.storage.all(cls)
        for value in all_cls.values():
            if (value.id == id):
                return value

        return None

    def count(self, cls=None):
        """
        count the number of objects in storage
        """
        all_class = classes.values()

        if not cls:
            count = 0
            for clas in all_class:
                count += len(models.storage.all(clas).values())
        else:
            count = len(models.storage.all(cls).values())

        return count


class ImageStorage:
    """Handles storing and retrieving images"""
    def generate_path(self, type, user_id, root_path, image_no=0):
        """Generate the path for the image to be stored depending on whether it
           is a profile photo or a work sample photo
        Args:
            type (str): profile or work, denoting what kind of image is being
                        stored
            user_id (str): id of user associated with the files
            root_path (str): api's root path
            image_no (int): image number for work images
        """
        if type == 'profile':
            image_path = path.join(root_path, 'profile_pics', user_id)
        elif type == 'work':
            image_path = path.join(root_path, 'work_images',
                                   user_id, f'image_{image_no}')
        return image_path

    def save_image(self, image_size, image_path, image):
        """Generates a thumbnail of the required size and saves it at
           the path given
           Args:
               image_size (int): size of the thumbnail to be generated
               image_path (int): path to store image at
               image (binary): the image file
        """
        output_size = (image_size, image_size)
        i = Image.open(image)
        i.thumbnail(output_size)
        i.save(image_path, "JPEG")

    def get_image(self, image_path):
        """Retrieve an image from file storage and return it"""
        with open(image_path, 'rb') as image:
            image = image.read()
        image = base64.b64encode(image).decode('utf-8')
        return image

    def process_incoming_image(self, image_file):
        """Process an image that's been received from the client"""
        image_bytes = base64.b64decode(image_file.encode('utf-8'))
        img = io.BytesIO(image_bytes)
        return img

    def get_images(self, image_folder_path):
        """
        Retrieves all the images stored in the directory given
        Args:
           image_folder_path (str): path to dir containing required images
        Return:
            List of image objects
        """
        images = []
        file_names = list_dir(image_folder_path)
        for name in file_names:
            image_path = path.join(image_folder_path, name)
            images.append(self.get_image(image_path))
        return images


class RedisCache:
    """
    Create a redis cache system
    """
    def __init__(self):
        """
        Create an instance of a Redis Client and flush it using flushdb
        """
        self._redis = redis.Redis()
        self._redis.flushdb()

    def store(self, data, expire=timedelta(hours=24)) -> str:
        """
        Store data and return key to access the data
        """
        key = str(uuid.uuid4())
        self._redis.setex(key, expire, data)
        return key

    def get(self, key):
        """
        Retrieve a stored value using the given key and returns it as
        a json object
        """
        data = self._redis.get(key)
        if data is not None:
            data = json.loads(data.decode('utf-8'))
        return data

    def set_add_logged_in(self, value):
        """
        Add token to set once a user is logged in
        """
        self._redis.sadd("logged_in", value)

    def is_logged_in(self, value):
        """
        Check whether user is logged in
        """
        return self._redis.sismember("logged_in", value)

    def remove_logged_in(self, value):
        """
        Remove token from list of logged_in user tokens
        """
        self._redis.srem("logged_in", value)
