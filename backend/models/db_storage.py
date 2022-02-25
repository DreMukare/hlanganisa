import io
import json
import redis
import uuid
import base64
import models
from dotenv import load_dotenv
from datetime import timedelta
from PIL import Image
from models.base_model import BaseModel, Base
from models.user import User
from models.post import Review, Request
from os import getenv, path, listdir, environ
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker

basedir = path.abspath(path.dirname(__file__))
load_dotenv(path.join(basedir, '.env'))

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
        MYSQL_DATABASE_URI = environ.get('SQLALCHEMY_DATABASE_URI')
        # DB_CONN = f'mysql+mysqldb://{MY_USER}:{PWD}@{HOST}/{DB}'
        # self.__engine = create_engine(DB_CONN)
        self.__engine = create_engine(MYSQL_DATABASE_URI)

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

    def get_user_by_email(self, email):
        """
        Retrieve user who has the specified email
        """
        user = self.__session.query(User).filter_by(email=email).first()
        return user

    def get_users_by_category(self, category):
        """
        Retrieve service providers who offer services in the specified category
        """
        users = self.__session.query(User).filter_by(category=category).all()
        return users

    def get_reviews_for_user(self, reviewee_id):
        """
        Retrieve all reviews that a user has received
        """
        id = user_id
        reviews = self.__session.query(Review).filter_by(reviewee_id=id).all()
        return reviews

    def get_reviews_by_user(self, user_id):
        """
        Retrieve all reviews that a user has made
        """
        id = user_id
        reviews = self.__session.query(Review).filter_by(user_id=id).all()
        return reviews

    def get_active_requests(self):
        """
        Retrieve all active requests
        """
        reqs = self.__session.query(Request).filter_by(status='active').all()
        reqs = [r.to_dict() for r in reqs]
        return reqs


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
    def __init__(self, host='localhost', port=6379, db=5):
        """
        Create an instance of a Redis Client and flush it using flushdb
        """
        self.pool = redis.ConnectionPool(host=host, port=port, db=db)
        self._redis = redis.StrictRedis(connection_pool=self.pool)
        self.redis_set = 'Login'
        #self._redis.flushdb()

    def store(self, key, data, expire=timedelta(hours=24)) -> str:
        """
        Store data and return key to access the data
        """
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
        return self._redis.sadd(self.redis_set, value)

    def is_logged_in(self, value):
        """
        Check whether user is logged in
        """
        return self._redis.sismember(self.redis_set, value)

    def remove_logged_in(self, value):
        """
        Remove token from list of logged_in user tokens
        """
        self._redis.srem("logged_in", value)

    def set_show_members(self):
        """
        Show all members of Login set
        """
        members = self._redis.smembers(self.redis_set)
        l = self._redis.scard(self.redis_set)
        return (l, members)

    def flush(self):
        """
        Flush the database to clear everything.
        Used when closing the app
        """
        self._redis.flushdb()
