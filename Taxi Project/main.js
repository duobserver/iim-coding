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
    return Math.floor(Math.random() * 5);
  }
}

class Personnage {
  constructor(name, mh) {
    this.name = name; // str
    this.mh = mh; // int (mental health)
    this.musics = [
      "Anissa",
      "Cry Dancing",
      "The Real Slim Shady",
      "Never Gonna Give You Up",
      "I Love It",
    ];
    this.artists = ["Wejdene", "Blessed Mane", "Eminem", "Rick Astley", "Icona Pop"];
  }

  next(target) {
    target.feux += 1;

    let selection = target.ranMusic();
    console.log(selection)

    if (selection == 0) {
      this.mh -= 1;
      target.changments += 1;
      console.log(
        `Oh no! ${this.name} is listening to ${this.musics[0]} by ${this.artists[0]}! He lost 1 mental health point and needs to take another taxi!`
      );
    } else {
      console.log(
        `${this.name} is listening to ${this.musics[selection]} by ${this.artists[selection]}! How cool! He can continue his ride!`
      );
    }
  }
}

// You can't call directly the class' methods, you need to create an instance first
let juan = new Personnage("Juan", 10);
let run = new Trajet(0, 0, 0);

while (juan.mh > 0 && run.feux < 30) {
  juan.next(run);
  if (juan.mh == 0) {
    console.log(
      `Oh no! Juan lost his mind and died! Game over! You passed ${run.feux} traffic lights and changed taxi ${run.changments} times!`
    );
    break;
  }
  if (run.feux == 30) {
    console.log(
      `Hurray! Juan didn't loose his mind and arrived home! He made by changing taxi ${run.changments} times!`
    );
    break;
  }
}
