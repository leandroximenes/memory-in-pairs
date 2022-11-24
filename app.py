from flask import Flask, render_template, redirect, session, request
from helpers import login_required
from flask_session import Session
import uuid

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
    session.clear()
    if request.method == "POST":
        userid = str(uuid.uuid4())
        # userid = str(uuid.uuid4().hex)
        room = str(uuid.uuid4())
        session["user_id"] = userid
        session["room"] = room
        USERS.append({
            'id_user': userid,
            'name': request.form.get("name"),
            'room': room
        })
        return redirect("/")
    else:
        return render_template("login.html")
