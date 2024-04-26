from machine import Pin, ADC, PWM # importe dans le code la lib qui permet de gerer les Pin de sortie et de reception de signaux analogique
import time # importe dans le code la lib qui permet de gerer le temps

pwm_led = PWM(Pin(17,mode=Pin.OUT))
pwm_led.freq(1_000)

adc = ADC(Pin(26, mode=Pin.IN)) # on prescise au programme que la pin 26 est une entré de type ADC

while True:# boucle infini
    val = adc.read_u16() # elle lit la valeur converti entre 0 et 65535
    #print(type(val))
    #val = val * (10 / 65535) # produit en crois pour retrouver le voltage
    print(int(val)) # ecrire la valeur de val en arrondisant à l'entier
    time.sleep_ms(100) # attendre 100ms => 0.1 seconde
    
    pwm_led.duty_u16(val)