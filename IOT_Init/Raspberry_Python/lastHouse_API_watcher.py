## Libraries

import network		# import wlan functions
import urequests	# import http requests functions
import ujson	# import json conversion functions

## RGB LED functions

from machine import Pin, PWM	# import pin controller and signal modulation libraries
import time		# import timing functions

led = [PWM(Pin(17,mode=Pin.OUT)), PWM(Pin(18,mode=Pin.OUT)), PWM(Pin(19,mode=Pin.OUT))] # select LED pins

for i in led:
    i.duty_u16(0)	# turn off all colors
    i.freq(1_000)	# set default frequency for each color

# create color combinations dictionary for hogwarts houses
houses = {
    "Gryffindor": [32, 0, 0],
    "Slytherin": [0, 32, 0],
    "Hufflepuff": [64, 32, 0],
    "Ravenclaw": [0, 32, 32]
    }

def houseColor(house):
    """
    house: hogwarts house name
    
    this function looks for the correct house color combination in the dictionary and sets the LED colors accordingly
    """
    if house in houses:		# if the house name exists
        color = houses[house]
        for i in range(3):
            led[i].duty_u16(color[i]*256)
    else:		# if the house name does not exist
        for i in led:
            i.duty_u16(0)
    
        
## Network connection and requests

wlan = network.WLAN(network.STA_IF)		# enter wlan client mode
wlan.active(True)

# wlan connection form
ssid = ''
password = ''

wlan.connect(ssid, password)	# connect raspberry to network

# paste the given API IP address here
url = "http://xxx.xxx.xxx.xxx:xxxx/"		# set URL for API requests

while not wlan.isconnected():	# if raspberry fails to connect to network
    print("not connected")
    time.sleep_ms(1000)
    pass

while(True):
    try:
        print("connected")
        print("GET")
        r = urequests.get(url)		# send request to saved URL
        
        house = (r.json()[0]["lastHouse"])		# process json response
        r.close()	# end request
        houseColor(house)
        
    except Exception as e:
        print(e)
    