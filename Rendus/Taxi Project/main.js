// creating musics list with Anissa
const musics = [
  ["Anissa", "Wejdene"],
  ["Cry Dancing", "Blessed Mane"],
  ["The Real Slim Shady", "Eminem"],
  ["Never Gonna Give You Up", "Rick Astley"],
  ["I Love It", "Icona Pop"],
];

class Trajet {
  constructor() {
    this.radio = 0;
    this.feux = 0;
    this.changments = 0;
  }

  ranMusic() {
    return Math.floor(Math.random() * 5);
  }
}

class Personnage {
  constructor() {
    this.name = "John";
    this.mh = 10;
  }

  next(target) {
    target.feux += 1;

    // selecting a random music and checking if it's Anissa
    let selection = target.ranMusic();
    if (musics[selection][0] == "Anissa") {
      this.mh -= 1;
      target.changments += 1;
      console.log(
        `${target.feux}. Oh no! ${this.name} is listening to ${
          musics[selection][0]
        } by ${
          musics[selection][1]
        }! He lost 1 mental health point and needs to ride another taxi!\n${
          30 - target.feux
        } traffic lights to go`
      );
    } else {
      console.log(
        `${target.feux}. ${this.name} is listening to ${
          musics[selection][0]
        } by ${musics[selection][1]}! He can continue his ride!\n${
          30 - target.feux
        } traffic lights to go`
      );
    }
  }
}

// You can't call directly the class' methods, you need to create an instance first
let rider = new Personnage();
let run = new Trajet();

while (rider.mh > 0 && run.feux < 30) {
  rider.next(run);
  if (rider.mh == 0) {
    console.log(
      `Oh no! ${rider.name} lost his mind and exploded! Game over! He passed ${
        run.feux
      } traffic lights and rode ${run.changments + 1} taxi!`
    );
    break;
  }
  if (run.feux == 30) {
    console.log(
      `Hurray! ${
        rider.name
      } didn't loose his mind and arrived home! He made it by riding ${
        run.changments + 1
      } taxis!`
    );
    break;
  }
}
