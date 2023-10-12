// Classes are groups of attributes under custome names that can be cloned (called instances)
let names = [
  "James",
  "Mary",
  "Robert",
  "Patricia",
  "John",
  "Jennifer",
  "Michael",
  "Linda",
  "David",
  "Elizabeth",
  "William",
  "Barbara",
  "Richard",
  "Susan",
  "Joseph",
  "Jessica",
  "Thomas",
  "Sarah",
  "Christopher",
  "Karen",
];

class Survivor {
  constructor(name, damage) {
    this.name = name;
    this.damage = damage;
    this.status = "alive";
  }
}

class Killer {
  constructor() {
    this.name = Jason;
    this.hp = 100;
  }
  next(target) {
    let action = Math.random();
    console.log(action);

    if (action <= 0.2) {
      this.hp -= target.damage + 5;
      target.status = "dead";
      console.log(
        `${this.name} attacks ${target.name}!\n${target.name} dealt ${
          target.damage + 5
        } points but died!`
      );
    } else if (action <= 0.3) {
      target.status = "dead";
      console.log(`${this.name} killed ${target.name}!`);
    } else {
      this.hp -= target.damage;
      console.log(
        `${this.name} attacks ${target.name}!\nBut ${target.name} dodged him and dealt ${target.damage} points!`
      );
    }
  }
}

// You can't call directly the class' methods, you need to create an instance first
let killer = new Killer();
let survivors = [];

for (let i = 0; i < 5; i++) {
  survivors.push(new Survivor(names[Math.floor(Math.random() * names.lenght)]));
}

console.log(survivors);

console.log(Math.floor(Math.random() * survivors.lenght));

// while (killer.hp > 0 && run.feux < 30) {
//   killer.next(Math.floor(Math.random() * survivors.lenght));
//   if (juan.mh == 0) {
//     console.log(
//       `Oh no! Juan lost his mind and exploded! Game over! He passed ${
//         run.feux
//       } traffic lights and rode ${run.changments + 1} taxi!`
//     );
//     break;
//   }
//   if (run.feux == 30) {
//     console.log(
//       `Hurray! Juan didn't loose his mind and arrived home! He made it by riding ${
//         run.changments + 1
//       } taxis!`
//     );
//     break;
//   }
// }
