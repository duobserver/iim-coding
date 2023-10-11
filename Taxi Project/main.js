// Classes are groups of attributes under custome names that can be cloned (called instances)

let musics = [
  "Anissa",
  "Cry Dancing",
  "The Real Slim Shady",
  "Never Gonna Give You Up",
  "I Love It",
];
let artists = ["Wejdene", "Blessed Mane", "Eminem", "Rick Astley", "Icona Pop"];

class Trajet {
  constructor(radio, feux, changments) {
    this.radio = radio;
    this.feux = feux;
    this.changments = changments;
  }

  ranMusic() {
    return Math.floor(Math.random() * length.musics);
  }
}

class Personnage {
  constructor(name, mh) {
    this.name = name; // str
    this.mh = mh; // int (mental health)
  }

  next(target) {
    target.feux += 1;
    let music = ranMusic()

    if (music == 0) {
      this.mh -= 1;
      target.changments += 1;
      console.log(`Oh no! ${this.name} is listening to ${musics[0]} by ${artists[0]}! He lost 1 mental health point and needs to take another taxi!`)
    } else {
      console.log(`${this.name} is listening to ${musics[music]} by ${artists[music]}! How cool! He can continue his ride!`)
    }
  }
}

// You can't call directly the class' methods, you need to create an instance first
let juan = new Personnage("Juan", 10);
let run = new Trajet(0, 0, 0);

while (juan.mh > 0) {
  juan.next(run);
}
