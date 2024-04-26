from machine import Pin, PWM # importe dans le code la lib qui permet de gerer les Pin de sortie et de modulation du signal
import time # importe dans le code la lib qui permet de gerer le temps

pwm_led = PWM(Pin(27,mode=Pin.OUT)) # on prescise au programme que la pin 27 est une sortie de type PWN
pwm_led.freq(1_000) # dont la frequence est de 1000 (default)
pwm_led.duty_u16(13000) # on lui donne une valeur comprise entre 0  et 65535 qui est converti entre 0 et 3.3v7

n = 65000
t = 0.1
go = "up"

while True:
    for i in range(n):
        pwm_led.duty_u16(i)
        
    for j in range(n):
        pwm_led.duty_u16(n - j)
    
#     pwm_led.duty_u16(n)
#         
#     if n == 65000:
#         go = "down"
#         
#     elif n == 0:
#         go = "up"
#         
#     if go == "up":
#         n += 1
#     else:
#         n -= 1