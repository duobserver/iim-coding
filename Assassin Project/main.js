// Classes are groups of attributes under custome names that can be cloned (called instances)
class Survivor {
  constructor(name) {
    this.name = name;
    this.damage = 10;

    console.log(this.name);
  }
}

class Killer {
  constructor() {
    this.name = "Jason";
    this.hp = 100;
  }
  next(target) {
    let action = Math.random();
    // console.log(action);

    if (action <= 0.2) {
      this.hp -= target.damage + 5;
      console.log(
        `${this.name} attacks ${target.name}!\n${target.name} dealt ${
          target.damage + 5
        } points but died!`
      );
      return 1;
    } else if (action <= 0.3) {
      console.log(`${this.name} killed ${target.name}!`);
      return 1;
    } else {
      this.hp -= target.damage;
      console.log(
        `${this.name} attacks ${target.name}!\nBut ${target.name} dodged him and dealt ${target.damage} points!`
      );
      return 0;
    }
  }
}

// You can't call directly the class' methods, you need to create an instance first
let killer = new Killer();

const names = [
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

let survivors = [];

for (let i = 0; i < 5; i++) {
  let name = Math.floor(Math.random() * names.length);
  survivors.push(new Survivor(names[name]));
  // delete names[name];
}

while (killer.hp > 0 && survivors.length != 0) {
  // console.log(survivors)
  selection = Math.floor(Math.random() * survivors.length);
  result = killer.next(survivors[selection]);
  if (result == 1) {
    survivors.pop(selection);
  }
  if (killer.hp <= 0) {
    console.log(`Hurray! The gang got rid of Jason!`);
    break;
  }
  
  if (survivors.length == 0) {
    console.log(
      `Oh no! Jason managed to kill every member of the gang! Game over!`
    );
    break
  }
}
