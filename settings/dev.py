from .base import *

DEBUG = True
TEMPLATE_DEBUG = DEBUG
SECRET_KEY = 'h9ohcow8x0el5ni6cv8-o9**f1=aa8&@rt5ahzf2pnk=l#&sjs'

DATABASES = {
   'default': {
       'ENGINE': 'django.db.backends.postgresql_psycopg2',
       'NAME': 'tododb',
       'USER': 'rileyhughes',
       'PASSWORD': 'sk8ing4z',
       'HOST': 'localhost',
       'PORT': '5432'
   }
}
