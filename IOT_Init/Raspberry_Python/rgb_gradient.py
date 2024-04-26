from machine import Pin, PWM # importe dans le code la lib qui permet de gerer les Pin de sortie et de modulation du signal
import time # importe dans le code la lib qui permet de gerer le temps

led = [PWM(Pin(17,mode=Pin.OUT)), PWM(Pin(18,mode=Pin.OUT)), PWM(Pin(19,mode=Pin.OUT))] # select gp pins

# pin 17 = red
# pin 18 = green
# pin 19 = blue
# [red, green, blue]

sleepy = 0
n = 20000

for i in led:
    i.duty_u16(0) # turn off all colors
    i.freq(1_000) # set default frequency for all colors

def gradient(color, go):
    """
    r, g and b required values are between 0 and 255
    """
    if go == 1:
        for i in range(n):
            led[color].duty_u16(i)
            time.sleep_ms(sleepy)
            
    elif go == 0:
        for i in range(n):
            led[color].duty_u16(n - i)
            time.sleep_ms(sleepy)

while True:
    gradient(0, 1)
    gradient(2, 0)
    gradient(1, 1)
    gradient(0, 0)
    gradient(2, 1)
    gradient(1, 0)