import secrets
from flask import Flask, render_template, redirect, session, request
from helpers import login_required, getRandomTitle
from flask_session import Session
import os
import hashlib
import random


app = Flask(__name__)

app.config["TEMPLATES_AUTO_RELOAD"] = True
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

USERS = []

@app.route("/")
@login_required
def index():
    return render_template("index.html", title="Hello")

@app.route("/login", methods=["GET", "POST"])
def login():
    error = None
    session.clear()
    if request.method == "POST":
        if not request.form.get("email"):
            error = 'Email required'
            return render_template('login.html', error=error)
        
        if not request.form.get("name"):
            error = 'Name required'
            return render_template('login.html', error=error)
                
        userid = secrets.token_hex(16)
        session["user_id"] = userid
        session["user_name"] = request.form.get("name")
        session["user_email"] = request.form.get("email")
        USERS.append({
            'id_user': userid,
            'name': request.form.get("name")
        })
        return redirect("/")

    return render_template('login.html', error=error)

@app.route("/logout")
def logout():
    session.clear()
    return redirect("/login")
    
@app.route("/teste")
@login_required
def teste():
    return render_template("teste.html")

@app.route("/room", methods = ['GET'])
@login_required
def room():
    title = request.args.get('name', getRandomTitle())

    images = os.listdir('static/img')
    images.remove('card.png')
    images.remove('CS50.png')

    imageList = []
    for i in range(len(images)):
        hash = hashlib.md5().hexdigest()
        firstpart, secondpart = hash[:len(hash)//2], hash[len(hash)//2:]
        imageList.append({"image": images[i], "hash": firstpart})
        imageList.append({"image": images[i], "hash": secondpart})
        
    random.shuffle(imageList)


    return render_template("room.html", title=title, imageList=imageList)