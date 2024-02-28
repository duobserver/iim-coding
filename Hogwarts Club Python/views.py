##################################################
# Packages

import sqlite3
from flask import Flask, render_template, request, redirect, url_for

##################################################
# Global variable

activeUser = 0

##################################################
# Database queries

def connection(username, password):
    global activeUser

    connection = sqlite3.connect('club.db')
    cursor = connection.cursor()
    run = "SELECT password FROM users WHERE username='" + username + "'"
    cursor.execute(run)
    output = cursor.fetchall()

    if len(output) != 0:
        if password == output[0][0]:
            activeUser = username
            print(activeUser)
        
        else:
            activeUser = 2
        
    else:
        activeUser = 1

    cursor.close()
    connection.close()

def register(username, displayname, email, phone, password):
    global activeUser

    data = (username, displayname, email, phone, password, 0, "", "hello world")

    connection = sqlite3.connect('club.db')
    cursor = connection.cursor()
    cursor.execute("SELECT username FROM users WHERE username='" + username + "'")
    output = cursor.fetchall()

    if len(output) == 0:
        cursor.execute("INSERT INTO users (username, displayname, email, phone, password, light, last, bio) VALUES(?, ?, ?, ?, ?, ?, ?, ?)", data)
        connection.commit()
        cursor.execute("UPDATE users SET last = datetime('now', 'localtime') WHERE username = ?", (username,))
        connection.commit()
        cursor.execute("CREATE TABLE IF NOT EXISTS " + username + "_collection (id TEXT, quantity INT, favored INT)")
        connection.commit()

        cursor.close()
        connection.close()

        activeUser = username

    else:
        activeUser = 4

##################################################
# Flask emulation

app = Flask(__name__)

@app.route('/')
def index():
    global activeUser
    return render_template("connection.html", user = activeUser)
    

@app.route('/signin')
def signin():
    collect = request.args
    username = collect['usernameSignIn']
    password = collect['passwordSignIn']
    connection(username, password)
    return redirect(url_for('index'))

@app.route('/signup')
def signup():
    print("signing up!")
    collect = request.args
    username = collect['usernameSignUp']
    displayname = collect['displayname']
    email = collect['email']
    phone = collect['phone']
    password = collect['passwordSignUp']
    register(username, displayname, email, phone, password)
    return redirect(url_for('index'))

@app.route('/disconnect')
def disconnect():
    global activeUser
    activeUser = 3
    return redirect(url_for('index'))

@app.route('/collection')
def collection():
    global activeUser

    connection = sqlite3.connect('club.db')
    cursor = connection.cursor()
    run = "SELECT id FROM " + activeUser + "_collection"
    cursor.execute(run)
    output = cursor.fetchall()
    return render_template("collection.html", response = output)

app.run(debug=True)
