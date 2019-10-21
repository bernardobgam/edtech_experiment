
'/var/www/static/',"""
Django settings for experiment project.

Generated by 'django-admin startproject' using Django 2.1.1.

For more information on this file, see
https://docs.djangoproject.com/en/2.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.1/ref/settings/
"""

import os
import urllib.request
# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '-qz_)1gghav@&i@3)^kv493^u-79i*#14b#i@#^%moj_f5#)y6'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ["*"]

# ALLOWED_HOSTS = ['experiment.rdfmpq8img.ap-southeast-2.elasticbeanstalk.com',
# 'uqexperiment.com',
# '.uqexperiment.com',
# '.elasticbeanstalk.com',
# 'www.uqexperiment.com',
# '127.0.0.1',
# 'localhost',
# '13.236.129.167'
# ]

# def is_ec2_linux():
#     """Detect if we are running on an EC2 Linux Instance
#        See http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/identify_ec2_instances.html
#     """
#     if os.path.isfile("/sys/hypervisor/uuid"):
#         with open("/sys/hypervisor/uuid") as f:
#             uuid = f.read()
#             return uuid.startswith("ec2")
#     return False
# def get_linux_ec2_private_ip():
#     """Get the private IP Address of the machine if running on an EC2 linux server"""
#     if not is_ec2_linux():
#         return None
#     try:
#         response = urllib.request.urlopen('http://169.254.169.254/latest/meta-data/local-ipv4')
#         return response.read()
#     except:
#         return None
#     finally:
#         if response:
#             response.close()
# # ElasticBeanstalk healthcheck sends requests with host header = internal ip
# # So we detect if we are in elastic beanstalk,
# # and add the instances private ip address
# private_ip = get_linux_ec2_private_ip()
# if private_ip:
#     ALLOWED_HOSTS.append(private_ip)

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # Django Apps
    'lab',
    'forms',
    'data',
    # Other Apps
    'import_export',
    # 'django_bot_crawler_blocker'
]



MIDDLEWARE = [
    # 'django_bot_crawler_blocker.django_bot_crawler_middleware.CrawlerBlockerMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'experiment.urls'

# CACHES = {
#     'default': {
#         'BACKEND': 'django.core.cache.backends.db.DatabaseCache',
#         'LOCATION': 'cache_table',
#     }
# }

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [ os.path.join(BASE_DIR, 'templates') ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'experiment.wsgi.application'


# Database
# https://docs.djangoproject.com/en/2.1/ref/settings/#databases

if 'RDS_DB_NAME' in os.environ:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.mysql',
            'NAME': os.environ['RDS_DB_NAME'],
            'USER': os.environ['RDS_USERNAME'],
            'PASSWORD': os.environ['RDS_PASSWORD'],
            'HOST': os.environ['RDS_HOSTNAME'],
            'PORT': os.environ['RDS_PORT'],
        }
    }
else :
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.mysql',
            'NAME': 'db_experiment',
            'USER': 'admin',
            'PASSWORD': 'admin',
            'HOST': 'localhost',
            'PORT': ''
        }
    }


# Password validation
# https://docs.djangoproject.com/en/2.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/2.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'Australia/Brisbane'

USE_I18N = True

USE_L10N = True

USE_TZ = True

CORS_ORIGIN_ALLOW_ALL = True
CORS_ALLOW_CREDENTIALS = False

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.1/howto/static-files/

STATIC_ROOT = "_static/"
STATIC_URL = '/_static/'

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, "static"),
]
# STATIC_ROOT = os.path.join(BASE_DIR, "_static")
# STATIC_URL = '/static/'
# STATICFILES_DIRS = [
#     os.path.join(BASE_DIR, "_static"),
# ]


LOGIN_REDIRECT_URL = '/'
LOGOUT_REDIRECT_URL = '/'


SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
# SESSION_COOKIE_SECURE = True
# CSRF_COOKIE_SECURE = True
