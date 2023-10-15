// road class
class Trajet {
  constructor() {
    this.radio = [
      ['"Anissa"', "Wejdene"],
      ['"Cry Dancing"', "Blessed Mane"],
      ['"The Real Slim Shady"', "Eminem"],
      ['"Never Gonna Give You Up"', "Rick Astley"],
      ['"I Love It"', "Icona Pop"],
    ]; // listing all the playable musics (list)
    this.redLight = 30; // red traffic lights counter (int)
    this.changments = 0; // number of taxis John rode (int)
  }
}

// John's class
class Personnage {
  constructor() {
    this.name = "John"; // name (string)
    this.mh = 10; // mental health (int)
  }

  next(target) {
    // selecting a random music
    let selection = Math.floor(Math.random() * target.radio.length);

    // checking if it's Anissa
    if (target.radio[selection][0] == '"Anissa"') {
      this.mh -= 1;
      target.changments += 1;
      console.log(
        `${target.redLight}. Oh no! ${this.name} is listening to ${target.radio[selection][0]} by ${target.radio[selection][1]}! He lost 1 mental health point and needs to ride another taxi!`
      );
    } else {
      console.log(
        `${target.redLight}. ${this.name} is listening to ${target.radio[selection][0]} by ${target.radio[selection][1]}! He can continue his ride!`
      );
    }
    // showing how many traffic lights are left
    console.log(`\t${target.redLight - 1} traffic lights to go`);
    target.redLight -= 1;
  }
}

// creating game instances
let passenger = new Personnage();
let road = new Trajet();
road.changments += 1; // John is already riding one taxi

// running game
while (passenger.mh > 0 && road.redLight > 0) {
  // next traffic light
  passenger.next(road);
  if (passenger.mh == 0) {
    // if John loses his mind, game over!
    console.log(
      `Oh no! ${
        passenger.name
      } lost his mind and exploded! Game over! He passed ${
        29 - road.redLight // John didn't pass the last logged traffic light
      } traffic lights and rode ${road.changments} taxis!`
    );
    break;
  }
  if (road.redLight == 0) {
    // if John passed all the traffic lights
    console.log(
      `Hurray! ${passenger.name} didn't loose his mind and arrived home! He rode ${road.changments} taxis!`
    );
    break;
  }
}
