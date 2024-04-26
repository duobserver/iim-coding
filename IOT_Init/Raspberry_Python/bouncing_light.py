from machine import Pin # importe dans le code la lib qui permet de gerer les Pins de sortie
import utime # importe dans le code la lib qui permet de gerer le temps

leds = [14, 10, 6, 2] # declare led gp pins
ledPins = [] # gp/led controllers

for i in leds: # create new gp/led controller for each gp/led pin
    ledPins.append(Pin(i, mode=Pin.OUT))

pin_button = Pin(17, mode=Pin.IN, pull=Pin.PULL_UP) # create gp/button controller

sleeptime = 0.1 # speed

while True:          # boucle infini
    if pin_button.value() == 1:
        for i in range(0, len(leds)):
            ledPins[i].on()
            utime.sleep(sleeptime)
            ledPins[i].off()
            
        for i in range(len(leds)-2, 0, -1): #reverse
            ledPins[i].on()
            utime.sleep(sleeptime)
            ledPins[i].off()
    
    #led.on()        allume la led 
    #led.off()       eteind la led 