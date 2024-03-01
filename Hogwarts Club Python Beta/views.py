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
    """
    If the provided indentity is correct, this function allows a specific user to access his account
    """
    global activeUser

    connection = sqlite3.connect('club.db')
    cursor = connection.cursor()
    cursor.execute("SELECT password FROM users WHERE username='" + username + "'")
    output = cursor.fetchall()

    if len(output) != 0:
        # if the username exists and the password is correct
        if password == output[0][0]:
            activeUser = username
            print(activeUser)
        
        else:
            # if the username exists but the password is wrong
            activeUser = 2
        
    else:
        # if the username doesn't exist
        activeUser = 1

    cursor.close()
    connection.close()

def register(username, displayname, email, phone, password):
    """
    If the provided new username isn't already used, this function creates a new account with the provided informations
    """
    global activeUser

    data = (username, displayname, email, phone, password, 0, "", "hello world")

    connection = sqlite3.connect('club.db')
    cursor = connection.cursor()
    cursor.execute("SELECT username FROM users WHERE username='" + username + "'")
    output = cursor.fetchall()

    if len(output) == 0:
        # if the username isn't already used by another account
        cursor.execute("INSERT INTO users (username, displayname, email, phone, password, light, last, bio) VALUES(?, ?, ?, ?, ?, ?, ?, ?)", data)
        connection.commit()
        cursor.execute("UPDATE users SET last = datetime('now', 'localtime') WHERE username = ?", (username,))
        connection.commit()
        cursor.execute("CREATE TABLE IF NOT EXISTS " + username + "_collection (id TEXT, quantity INT, favored INT)")
        connection.commit()
        cursor.execute("CREATE TABLE IF NOT EXISTS " + username + "_friends (friendUsername TEXT, status INT)")
        connection.commit()
        cursor.execute("CREATE TABLE IF NOT EXISTS " + username + "_trades (traderUsername TEXT, status INT, cardToGive TEXT, cardToReceive TEXT)")
        connection.commit()

        cursor.close()
        connection.close()

        activeUser = username

    else:
        # if the username is already used by another account
        cursor.close()
        connection.close()
        activeUser = 4

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
        # if the user already has copy of this card
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
# Friends system

def friendList():
    """
    If an user is effectively active/connected, this function returns his friend list
    """
    global activeUser

    if not type(activeUser) == int:
        connection = sqlite3.connect('club.db')
        cursor = connection.cursor()

        cursor.execute("SELECT * FROM " + activeUser + "_friends")
        output =  cursor.fetchall()

        cursor.close()
        connection.close()

        return output
    
    else:
        return [()]

def friendRequest(friendUsername):
    """
    This function adds a pending (0) friend request in the user's friends table
    It also adds a pending friend request in the targeted user's friends table sinci he needs to accept it or not (1)
    """
    global activeUser

    connection = sqlite3.connect('club.db')
    cursor = connection.cursor()

    cursor.execute("INSERT INTO " + activeUser + "_friends (friendUsername, status) VALUES (?, ?)", (friendUsername, 0))
    connection.commit()
    
    cursor.execute("INSERT INTO " + friendUsername + "_friends (friendUsername, status) VALUES (?, ?)", (activeUser, 1))
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
# Card trading system

def tradesList():
    global activeUser

    if not type(activeUser) == int:
        connection = sqlite3.connect('club.db')
        cursor = connection.cursor()

        cursor.execute("SELECT ROWINT, * FROM " + activeUser + "_trades")
        output = cursor.fetchall()

        cursor.close()
        connection.close()

        return output
    
    else:
        return []

def tradeOffer(traderUsername, cardToGive, cardToReceive):
    global activeUser

    connection = sqlite3.connect('club.db')
    cursor = connection.cursor()

    cursor.execute("INSERT INTO " + activeUser + "_trades (traderUsername, status, cardToGive, cardToReceive) VALUES (?, ?, ?, ?)", (traderUsername, 0, cardToGive, cardToReceive))
    connection.commit()

    cursor.execute("INSERT INTO " + traderUsername + "_trades (traderUsername, status, cardToGive, cardToReceive) VALUES (?, ?, ?, ?)", (activeUser, 1, cardToReceive, cardToGive))
    connection.commit()

    cursor.close()
    connection.close()

def tradeDelete(tradeId):
    global activeUser

    connection = sqlite3.connect('club.db')
    cursor = connection.cursor()

    cursor.execute("SELECT targetUsername FROM " + activeUser + "_trades WHERE id = " + str(tradeId))
    exchange = cursor.fetchall()

    cursor.execute("DELETE FROM " + activeUser + "_trades WHERE id = " + str(tradeId))
    connection.commit()

    cursor.execute("DELETE FROM " + exchange[0][0] + "_trades WHERE id = " + str(tradeId))
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

    friends = friendList()
    exchange = tradesList()
    return render_template("connection.html", user = activeUser, friends = friends, exchanges = exchange)
    

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

    if not type(activeUser) == int:
        connection = sqlite3.connect('club.db')
        cursor = connection.cursor()
        cursor.execute("SELECT id FROM " + activeUser + "_collection")
        output = cursor.fetchall()
        cursor.close()
        connection.close()
        return render_template("collection.html", response = output)
    
    else:
        return render_template("collection.html", response = [])

@app.route('/friendrequest')
def friendrequest():
    collect = request.args
    friendUsername = collect['friendUsername']
    friendRequest(friendUsername)
    return redirect(url_for('index'))

@app.route('/friendAction/<action>/<friendUsername>')
def friendAction(action, friendUsername):
    # action = request.args.get('action')
    # friendUsername = request.args.get('friendUsername')
    friendAction(friendUsername, action)
    return redirect(url_for('index'))

@app.route('/tradeOffer')
def tradeOffer():
    collect = request.args
    targetUsername = collect['targetUsername']
    cardToGive = collect['cardToGive']
    cardToReceive = collect['cardToReceive']
    tradeOffer(targetUsername, cardToGive, cardToReceive)
    return redirect(url_for('index'))

@app.route('/exchange/<action>/<id>')
def exchange(action, id):
    tradeAction(action, id)
    return redirect(url_for('index'))

app.run(debug=True)
