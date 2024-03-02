##################################################
# Packages

import sqlite3, random
from flask import Flask, render_template, request, redirect, url_for

##################################################
# Global variable

activeUser = [0, "No user connected"]

##################################################
# Database queries

#########################
# Account queries

def logIn(username, password):
    """
    If the provided indentity is correct, this function allows a specific user to access his account
    """
    global activeUser

    connection = sqlite3.connect('club.db')
    cursor = connection.cursor()
    cursor.execute("SELECT password FROM users WHERE username = '" + username + "'")
    output = cursor.fetchall()

    if len(output) != 0:
        # if the username exists and the password is correct
        if password == output[0][0]:
            activeUser = [1, username]
        
        else:
            # if the username exists but the password is wrong
            activeUser = [0, "Wrong password"]
        
    else:
        # if the username doesn't exist
        activeUser = [0, "Username not found"]

    cursor.close()
    connection.close()

def signUp(username, displayname, email, phone, password):
    """
    If the provided new username isn't already used, this function creates a new account with the provided informations
    """
    global activeUser

    data = (username, displayname, email, phone, password, 0, "hello world")

    connection = sqlite3.connect('club.db')
    cursor = connection.cursor()
    cursor.execute("SELECT username FROM users WHERE username='" + username + "'")
    output = cursor.fetchall()

    if len(output) == 0:
        # if the username isn't already used by another account, register account with provided informations
        cursor.execute("INSERT INTO users (username, displayname, email, phone, password, light, bio) VALUES(?, ?, ?, ?, ?, ?, ?)", data)
        connection.commit()

        # create card collection table for new accout
        cursor.execute("CREATE TABLE IF NOT EXISTS " + username + "_collection (id TEXT, quantity INT, favored INT)")
        connection.commit()

        # create friends table for new account
        cursor.execute("CREATE TABLE IF NOT EXISTS " + username + "_friends (friendUsername TEXT, status INT)")
        connection.commit()

        # create ongoing trades table for new account
        cursor.execute("CREATE TABLE IF NOT EXISTS " + username + "_trades (tradeId INT, traderUsername TEXT, status INT, cardToGive TEXT, cardToReceive TEXT, PRIMARY KEY('tradeId'))")
        connection.commit()
        
        # create logs table for new account
        cursor.execute("CREATE TABLE IF NOT EXISTS " + username + "_logs (timestamp TEXT, type TEXT, event TEXT)")
        connection.commit()

        # add first log to logs table
        cursor.execute("INSERT INTO " + username + "_logs (timestamp, type, event) VALUES (datetime('now'), 'signup', 'Account created')")

        # create booster table for new account
        cursor.execute("CREATE TABLE IF NOT EXISTS " + username + "_booster (lastTaken TEXT, available INT, cardId INT)")
        connection.commit()

        # give first booster to account
        cursor.execute("INSERT INTO " + username + "_booster (lastTaken, available, cardId) VALUES (datetime('now'), 1, 1)")
        connection.commit()

        cursor.close()
        connection.close()

        activeUser = [1, username]

    else:
        # if the username is already used by another account
        cursor.close()
        connection.close()
        
        activeUser = [0, "Username already used by another account"]

#########################
# Cards queries

def hasCard(username, cardId):
    """
    This function verifies if a user owns a specific card in his collection
    """
    connection = sqlite3.connect('club.db')
    cursor = connection.cursor()
    
    # looking for a card copy in the user's collection
    cursor.execute("SELECT * FROM " + username + "_collection WHERE id = " + cardId)
    output = cursor.fetchall()

    cursor.close()
    connection.close()

    if len(output) == 1: return True # if the user owns one or more copies of the card
    
    else: return False # if the user doesn't own a copy of the card

def addCard(username, cardId):
    """
    This function adds a specific card to the user's collection
    """
    connection = sqlite3.connect('club.db')
    cursor = connection.cursor()
    
    # looking for a card copy in the user's collection
    cursor.execute("SELECT * FROM " + username + "_collection WHERE id = " + cardId)
    card = cursor.fetchall()

    if len(card) == 1:
        # if the user already one or more copies of this card
        cursor.execute("UPDATE " + username + "_collection SET quantity = quantity + 1 WHERE id =" + cardId)
        connection.commit()

    else:
        # if the user doesn't have a copy of this card
        cursor.execute("INSERT INTO " + username + "_collection (id, quantity, favored) VALUES (?, ?, ?)", (cardId, 1, 0))
        connection.commit()

    cursor.close()
    connection.close()

def removeCard(username, cardId):
    """
    This function removes a specific card from the user's collection
    """
    connection = sqlite3.connect('club.db')
    cursor = connection.cursor()
    
    # looking for a card copy in the user's collection
    cursor.execute("SELECT * FROM " + username + "_collection WHERE id = " + cardId)
    card = cursor.fetchall()

    if card[0][1] > 1:
        # if the user has more than one copy of this card
        cursor.execute("UPDATE " + username + "_collection SET quantity = quantity - 1 WHERE id =" + cardId)
        connection.commit()

    else:
        # if the user has only one copy of this card
        cursor.execute("DELETE FROM " + username + "_collection WHERE id =" + cardId)
        connection.commit()

    cursor.close()
    connection.close()

#########################
# Friends queries

def friendList(username):
    """
    This function returns the user's friends list
    """
    connection = sqlite3.connect('club.db')
    cursor = connection.cursor()

    cursor.execute("SELECT * FROM " + username + "_friends")
    output =  cursor.fetchall()

    cursor.close()
    connection.close()

    return output

def friendRequest(username, friendUsername):
    """
    This function adds a pending (0) friend request in the user's friends table
    It also adds a pending friend request in the targeted user's friends table sinci he needs to accept it or not (1)
    """
    connection = sqlite3.connect('club.db')
    cursor = connection.cursor()

    cursor.execute("INSERT INTO " + username + "_friends (friendUsername, status) VALUES (?, ?)", (friendUsername, 0))
    connection.commit()
    
    cursor.execute("INSERT INTO " + friendUsername + "_friends (friendUsername, status) VALUES (?, ?)", (username, 1))
    connection.commit()

    cursor.close()
    connection.close()

def friendAction(friendUsername, action):
    global activeUser

    connection = sqlite3.connect('club.db')
    cursor = connection.cursor()

    if action == "accept":
        cursor.execute("UPDATE " + activeUser + "_friends SET status = 2 WHERE friendUsername = '" + friendUsername + "'")
        connection.commit()
        cursor.execute("UPDATE " + friendUsername + "_friends SET status = 2 WHERE friendUsername = '" + activeUser + "'")
        connection.commit()
    
    elif action == "reject" or action == "delete":
        cursor.execute("DELETE FROM  " + activeUser + "_friends WHERE friendUsername = '" + friendUsername + "'")
        connection.commit()
        cursor.execute("DELETE FROM  " + friendUsername + "_friends WHERE friendUsername = '" + activeUser + "'")
        connection.commit()

    cursor.close()
    connection.close()

#########################
# Trading queries

def tradesList(username):
    connection = sqlite3.connect('club.db')
    cursor = connection.cursor()

    cursor.execute("SELECT * FROM " + username + "_trades")
    output = cursor.fetchall()

    cursor.close()
    connection.close()

    return output

def tradeIdVerify(tradeId, username, traderUsername):
    """
    This function verifies if the tradeId is already used in another contract in both traders' tables
    """
    connection = sqlite3.connect('club.db')
    cursor = connection.cursor()

    cursor.execute("SELECT * FROM " + username + "_trades WHERE tradeId = " + str(tradeId))
    tradeContract1 = cursor.fetchall()

    cursor.execute("SELECT * FROM " + traderUsername + "_trades WHERE tradeId = " + str(tradeId))
    tradeContract2 = cursor.fetchall()

    cursor.close()
    connection.close()

    if len(tradeContract1) == 0 and len(tradeContract1) == 0:
        return False
    
    return True

def tradeOffer(traderUsername, cardToGive, cardToReceive):
    """
    This function adds a trade offer in both traders' tables with a pending (0) status for the user who sent the offer and a confimation status (1) for the user who received it
    """
    global activeUser

    # create a random id for the trade offer and verify that it isn't already used by another trade offer in both traders' tables
    tradeId = random.randint(0, 100000)

    while tradeIdVerify(tradeId, activeUser, traderUsername):
        tradeId = random.randint(0, 100000)

    connection = sqlite3.connect('club.db')
    cursor = connection.cursor()

    cursor.execute("INSERT INTO " + activeUser + "_trades (tradeId, traderUsername, status, cardToGive, cardToReceive) VALUES (?, ?, ?, ?, ?)", (tradeId, traderUsername, 0, cardToGive, cardToReceive))
    connection.commit()

    cursor.execute("INSERT INTO " + traderUsername + "_trades (tradeId, traderUsername, status, cardToGive, cardToReceive) VALUES (?, ?, ?, ?, ?)", (tradeId, activeUser, 1, cardToReceive, cardToGive))
    connection.commit()

    cursor.close()
    connection.close()

def tradeDelete(tradeId):
    """
    This function deletes a trade offer in both traders' tables (because it has been deleted by the user who sent the offer or rejected by the user who received the offer)
    """
    global activeUser

    connection = sqlite3.connect('club.db')
    cursor = connection.cursor()

    # find the user that received the trade offer
    cursor.execute("SELECT traderUsername FROM " + activeUser + "_trades WHERE tradeId = " + str(tradeId))
    tradeContract = cursor.fetchall()

    cursor.execute("DELETE FROM " + tradeContract[0][0] + "_trades WHERE tradeId = " + str(tradeId))
    connection.commit()

    cursor.execute("DELETE FROM " + activeUser + "_trades WHERE tradeId = " + str(tradeId))
    connection.commit()

    cursor.close()
    connection.close()

def tradeAction(action, id):
    global activeUser

    connection = sqlite3.connect('club.db')
    cursor = connection.cursor()

    cursor.execute("SELECT * FROM " + activeUser + "_mailbox WHERE id = " + id)
    request = cursor.fetchall()

    if action == 'accept':
        # if the user accepts the request
        targetUser = request[0][1]
        cardToGive = request[0][3]
        cardToReceive = request[0][4]

        if not cardToGive == 0 and not cardToReceive == 0:
            # if the exchange request says that the user has to give a card and will receive another card
            me = hasCard(activeUser, cardToGive)
            you = hasCard(targetUser, cardToReceive)

            if me and you:
                removeCard(activeUser, cardToGive)
                addCard(activeUser, cardToReceive)

                removeCard(targetUser, cardToReceive)
                addCard(targetUser, cardToGive)

        elif not cardToGive == 0 and cardToReceive == 0:
            # if the exchange request says that the user has to give a card but won't receive another card (gift)
            me = hasCard(activeUser, cardToGive)

            if me:
                removeCard(activeUser, cardToGive)
                addCard(targetUser, cardToGive)

        elif cardToGive == 0 and not cardToReceive == 0:
            # if the exchange request says that the user won't give a card but will receive another card (kinda weird ngl)
            you = hasCard(targetUser, cardToReceive)

            if you:
                addCard(activeUser, cardToReceive)
                removeCard(targetUser, cardToReceive)
    
    elif action == 'reject' or action == 'delete':
        tradeDelete(request[0][0])

##################################################
# Flask emulation

app = Flask(__name__)

@app.route('/')
def index():
    global activeUser

    if activeUser[0] == 1:
        return render_template("index.html", user = activeUser, friends = friendList(activeUser[1]), exchanges = tradesList(activeUser[1]))
    
    else:
        return render_template("index.html", user = activeUser, friends = [], exchanges = [])
    
@app.route('/authentication')
def authentication():
    global activeUser

    return render_template("authentication.html", user = activeUser)

@app.route('/login')
def login():
    collect = request.args
    username = collect['usernameLogIn']
    password = collect['passwordLogIn']
    logIn(username, password)
    return redirect(url_for('index'))

@app.route('/signup')
def signup():
    collect = request.args
    username = collect['usernameSignUp']
    displayname = collect['displayname']
    email = collect['email']
    phone = collect['phone']
    password = collect['passwordSignUp']
    signUp(username, displayname, email, phone, password)
    return redirect(url_for('index'))

@app.route('/logout')
def logout():
    global activeUser
    activeUser = [0, "Successfully logged out"]
    return redirect(url_for('index'))

@app.route('/collection')
def collection():
    global activeUser

    if activeUser[0] == 1:
        connection = sqlite3.connect('club.db')
        cursor = connection.cursor()
        cursor.execute("SELECT id FROM " + activeUser[1] + "_collection")
        output = cursor.fetchall()
        cursor.close()
        connection.close()
        return render_template("collection.html", response = output)
    
    else:
        return render_template("collection.html", response = [])

@app.route('/friendrequest')
def friendrequest():
    global activeUser

    if activeUser[0] == 1:
        collect = request.args
        friendUsername = collect['friendUsername']
        friendRequest(activeUser[1], friendUsername)
        return redirect(url_for('index'))

@app.route('/friendAction/<action>/<friendUsername>')
def friendAction(action, friendUsername):
    friendAction(friendUsername, action)
    return redirect(url_for('index'))

@app.route('/tradeoffer')
def tradeoffer():
    collect = request.args
    targetUsername = collect['targetUsername']
    cardToGive = collect['cardToGive']
    cardToReceive = collect['cardToReceive']
    tradeOffer(targetUsername, cardToGive, cardToReceive)
    return redirect(url_for('index'))

@app.route('/trade/<action>/<id>')
def trade(action, id):
    tradeAction(action, id)
    return redirect(url_for('index'))

@app.route('/members')
def members():
    pass

@app.route('/catalogue')
def catalogue():
    pass

@app.route('/booster')
def booster():
    pass

@app.route('/profile/<username>')
def profile(username):
    pass

@app.route('/settings/<username>')
def settings(username):
    pass

##################################################
# Script autorun

#########################
# Users table generation

connection = sqlite3.connect('club.db')
cursor = connection.cursor()

cursor.execute("CREATE TABLE IF NOT EXISTS users (username TEXT, displayname TEXT, email TEXT, phone TEXT, password TEXT, light INT, bio TEXT)")
connection.commit()

cursor.close()
connection.close()

#########################
# Flask server emulation start

app.run(debug=True)
