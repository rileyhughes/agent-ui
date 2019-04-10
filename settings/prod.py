from .base import *
import dj_database_url

DEBUG = False
SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY')
DATABASES = {'default': dj_database_url.config(conn_max_age=500)}
