import os
from celery.schedules import crontab


# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

SECRET_KEY = os.environ["SECRET_KEY"]

DEBUG = os.environ["ENVIRONMENT"] != 'production'

AUTH_USER_MODEL = "users.User"

# ALLOWED_HOSTS = os.environ["ALLOWED_HOSTS"].split(",")
ALLOWED_HOSTS = ["*"]
# CORS_ORIGIN_WHITELIST = [os.environ["LANDING_ENDPOINT"], os.environ["APP_ENDPOINT"]]
CORS_ORIGIN_ALLOW_ALL = True

# Application definition

THIRD_PARTY_APPS = [
    "corsheaders",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django_extensions",
    "django_filters",
    "django_inlinecss",
    "rest_framework",
    "rest_framework.authtoken",
    # "rest_framework_filters",
    "storages",
]

LOCAL_APPS = [
    "development",
    "transfers",
    "users",
    "utils",
]

INSTALLED_APPS = THIRD_PARTY_APPS + LOCAL_APPS

EMAIL_HOST = "smtp.sendgrid.net"
EMAIL_HOST_USER = "apikey"
EMAIL_HOST_PASSWORD = os.environ["SENDGRID_API_KEY"]
EMAIL_PORT = 587
EMAIL_USE_TLS = True

DEFAULT_FROM_EMAIL = os.environ["DEFAULT_FROM_EMAIL"]

SENGRID_API_KEY = os.environ["SENDGRID_API_KEY"]

CELERY_BROKER_URL = f'redis://{os.environ["REDIS_HOST"]}:{os.environ["REDIS_PORT"]}'
CELERY_IMPORTS = []
CELERY_BEAT_SCHEDULE = {
    "debug_task_every_minute": {"task": "development.tasks.debug_task", "schedule": 60},
    "debug_task_every_friday": {
        "task": "development.tasks.debug_task",
        "schedule": crontab(hour=16, minute=0, day_of_week="friday"),
    },
    "transfer_settling_task": {"task": "transfers.tasks.settle_transfers_task", "schedule": 60},
}

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "development.middlewares.SleepMiddleware",
]

ROOT_URLCONF = "iksde_bank.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [
            BASE_DIR,  # allows for "absolute" path (from project root) to template
        ],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "iksde_bank.wsgi.application"

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": os.environ["POSTGRES_DB_NAME"],
        "USER": os.environ["POSTGRES_DB_USER"],
        "PASSWORD": os.environ["POSTGRES_DB_PASSWORD"],
        "HOST": os.environ["POSTGRES_HOST"],
        "PORT": os.environ["POSTGRES_PORT"],
    }
}

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",},
]

REST_FRAMEWORK = {
    "DEFAULT_FILTER_BACKENDS": ("django_filters.rest_framework.DjangoFilterBackend",),
    # "DEFAULT_FILTER_BACKENDS": ("rest_framework_filters.backends.RestFrameworkFilterBackend",),
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework.authentication.TokenAuthentication",
    ),
    'EXCEPTION_HANDLER': 'utils.exceptions.custom_exception_handler'
}

# Internationalization
# https://docs.djangoproject.com/en/3.0/topics/i18n/
LANGUAGE_CODE = "pl"
TIME_ZONE = "Europe/Warsaw"
USE_I18N = True
USE_L10N = True
USE_TZ = True

MEDIA_URL = "/uploads/"
MEDIA_ROOT = os.path.join(BASE_DIR, "uploads")
STATIC_URL = "/static/"
STATIC_ROOT = os.path.join(BASE_DIR, "static")

DEBUG_MAIL_RECIPIENT = os.environ["DEBUG_MAIL_RECIPIENT"]
SLEEP_TIME = 0.5
