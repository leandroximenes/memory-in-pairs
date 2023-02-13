import secrets
from flask import Flask, render_template, redirect, session, request
from helpers import login_required, getRandomTitle, getImagesList, getStringDB
from flask_session import Session
from cs50 import SQL
from datetime import datetime, timezone


app = Flask(__name__)

app.config["TEMPLATES_AUTO_RELOAD"] = True
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Configure CS50 Library to use SQLite database
db = SQL(getStringDB())


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

        db.execute("INSERT INTO users (nome, email, loggin_in) VALUES(?, ?, ?)",
                   session["user_name"], session["user_email"], datetime.now(timezone.utc))
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


@app.route("/players")
@login_required
def players():
    players = db.execute("SELECT * FROM users")
    return render_template("players.html", players=players)


@app.route("/room", methods=['GET'])
@login_required
def room():
    title = None
    imageList = None

    # create a room
    if (request.args.get('name') == None):
        title = getRandomTitle()
        imageList = getImagesList()

        idRoom = db.execute("INSERT INTO rooms (title) VALUES(?)", title)
        for key, image in enumerate(imageList):
            db.execute("INSERT INTO images (id_room, file, half_hash, full_hash, seq) VALUES(?, ?, ?, ? ,?)",
                       idRoom, image["file"], image["half_hash"], image["full_hash"], key)

    # get in a room
    else:
        title = request.args.get('name')
        imageList = db.execute(
            "SELECT * FROM images WHERE id_room = (SELECT id FROM rooms WHERE title = ?) ORDER BY seq", title)

    return render_template("room.html", title=title, imageList=imageList)
