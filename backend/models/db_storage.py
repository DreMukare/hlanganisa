import io
import base64
import models
import secrets
from PIL import Image
from models.base_model import BaseModel, Base
from models.user import User
from os import getenv, path
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker

classes = {"Amenity": Amenity, "City": City,
           "Place": Place, "Review": Review, "State": State, "User": User}


class DBStorage:
    """interacts with the MySQL database"""
    __engine = None
    __session = None

    def __init__(self):
        """Instantiate a DBStorage object"""
        HBNB_MYSQL_USER = getenv('HBNB_MYSQL_USER')
        HBNB_MYSQL_PWD = getenv('HBNB_MYSQL_PWD')
        HBNB_MYSQL_HOST = getenv('HBNB_MYSQL_HOST')
        HBNB_MYSQL_DB = getenv('HBNB_MYSQL_DB')
        HBNB_ENV = getenv('HBNB_ENV')
        self.__engine = create_engine('mysql+mysqldb://{}:{}@{}/{}'.
                                      format(HBNB_MYSQL_USER,
                                             HBNB_MYSQL_PWD,
                                             HBNB_MYSQL_HOST,
                                             HBNB_MYSQL_DB))
        if HBNB_ENV == "test":
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
    def generate_path(type, user_id, root_path, image_no):
        """Generate the path for the image to be stored depending on whether it
           is a profile photo or a work sample photo
        Args:
            type (str): profile or work, denoting what kind of image is being
                        stored
            user_id (str): id of user associated with the files
            root_path (str): api's root path
            image_no (int): image number for work images
        """
        #random_hex = secrets.token_hex(8)
        #_, f_ext = os.path.splitext(form_picture.filename)
        #picture_fn = random_hex + f_ext
        #picture_path = os.path.join(app.root_path, 'static/profile_pics', picture_fn)
        #return picture_fn
        if type == 'profile':
            image_path = os.path.join(root_path, 'profile_pics', user_id)
        elif type == 'work':
            image_path = os.path.join(root_path, 'work_images',
                                      user_id, f'image_{image_no}')
        return image_path

    def save_image(image_size, image_path, image):
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

    def get_image(image_path):
        """Retrieve an image from file storage and return it"""
        with open(image_path, 'rb') as image:
            image = image.read()
        return image

    def process_incoming_image(image_file):
        """Process an image that's been received from the client"""
        image_bytes = base64.b64decode(image_file.encode('utf-8'))
        img = io.BytesIO(image_byts)
        return img
