from machine import Pin, PWM # importe dans le code la lib qui permet de gerer les Pin de sortie et de modulation du signal
import time # importe dans le code la lib qui permet de gerer le temps

led = [PWM(Pin(17,mode=Pin.OUT)), PWM(Pin(18,mode=Pin.OUT)), PWM(Pin(19,mode=Pin.OUT))] # select gp pins

# pin 17 = red
# pin 18 = green
# pin 19 = blue
# [red, green, blue]

sleepy = 1000

for i in led:
    i.duty_u16(0) # turn off all colors
    i.freq(1_000) # set default frequency for each color

def setColor(r, g, b):
    """
    r, g and b required values are between 0 and 255
    """
    color = [r, g, b]
    for i in range(3):
        led[i].duty_u16(color[i]*256)

while True:
    setColor(255, 0, 0) # red
    time.sleep_ms(sleepy)
    
    setColor(0, 127, 0) # green
    time.sleep_ms(sleepy)
    
    setColor(0, 0, 255) # blue
    time.sleep_ms(sleepy)
    
    setColor(255, 0, 255) # pink
    time.sleep_ms(sleepy)
    
    setColor(255, 255, 255) # white
    time.sleep_ms(sleepy)