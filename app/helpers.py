from flask import redirect, session
from functools import wraps
import random

def login_required(f):
    """
    Decorate routes to require login.
    https://flask.palletsprojects.com/en/1.1.x/patterns/viewdecorators/
    """
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if session.get("user_id") is None:
            return redirect("/login")
        return f(*args, **kwargs)
    return decorated_function

def printr(text):
    print(text)
    return ''

def getRandomTitle():
    my_file = open("titles.txt", "r")
    list = my_file.read().splitlines()
    my_file.close()
    return random.choice(list)