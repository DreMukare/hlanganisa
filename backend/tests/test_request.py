import testing.mysqld
from sqlalchemy import create_engine

# Lanuch new MySQL server
with testing.mysqld.Mysqld() as mysqld:
    # connect to MySQL
    engine = create_engine(mysqld.url())

    # if you use mysqldb or other drivers:
    #   import _mysql
    #   db = _mysql.connect(**mysqld.dsn())

    #
    # do any tests using MySQL...
    #

# MySQL server is terminated here