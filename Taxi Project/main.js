// Classes are groups of attributes under custome names that can be cloned (called instances)
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
    this.artists = [
      "Wejdene",
      "Blessed Mane",
      "Eminem",
      "Rick Astley",
      "Icona Pop",
    ];
  }

  next(target) {
    target.feux += 1;

    let selection = target.ranMusic();
    // console.log(selection)

    if (selection == 0) {
      this.mh -= 1;
      target.changments += 1;
      console.log(
        `${target.feux}. Oh no! ${this.name} is listening to ${
          this.musics[0]
        } by ${
          this.artists[0]
        }! He lost 1 mental health point and needs to ride another taxi! ${
          30 - target.feux
        } traffic lights left!`
      );
    } else {
      console.log(
        `${target.feux}. ${this.name} is listening to ${
          this.musics[selection]
        } by ${this.artists[selection]}! He can continue his ride! ${
          30 - target.feux
        } traffic lights left!`
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
      `Oh no! Juan lost his mind and exploded! Game over! He passed ${
        run.feux
      } traffic lights and rode ${run.changments + 1} taxi!`
    );
    break;
  }
  if (run.feux == 30) {
    console.log(
      `Hurray! Juan didn't loose his mind and arrived home! He made it by riding ${
        run.changments + 1
      } taxis!`
    );
    break;
  }
}
