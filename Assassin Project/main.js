// Classes are groups of attributes under custome names that can be cloned (called instances)
class Survivor {
  constructor(name, trait) {
    this.name = name;
    this.trait = trait;

    console.log(`\t${this.name}, ${this.trait}`);
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
      this.hp -= 15;
      console.log(
        `${this.name} attacks ${target.name}!\n${target.name} dealt 15 points but died!`
      );
      return 1;
    } else if (action <= 0.3) {
      console.log(`${this.name} killed someone!`);
      return 1;
    } else {
      this.hp -= 10;
      console.log(
        `${this.name} attacks ${target.name}!\nBut ${target.name} dodged him and dealt 10 points!`
      );
      return 0;
    }
  }
}

// You can't call directly the class' methods, you need to create an instance first
let killer = new Killer();

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

let characteristics = [
  "Weak",
  "Scared",
  "Blondy",
  "Nerd",
  "Assistant",
  "Agile",
  "Sporty",
  "Rageous",
  "Shooter",
];

let survivors = [];
let deathList = [];

console.log("The gang ---")
for (let i = 0; i < 5; i++) {
  let name = Math.floor(Math.random() * names.length);
  let char = Math.floor(Math.random() * characteristics.length);
  survivors.push(new Survivor(names[name], characteristics[char]));
  names.splice(name, 1);
}

console.log("Let's play ! ---")
while (killer.hp > 0 && survivors.length != 0) {
  // console.log(survivors)
  selection = Math.floor(Math.random() * survivors.length);
  result = killer.next(survivors[selection]);
  if (result == 1) {
    deathList.push(survivors.pop(selection).name);
    // console.log(deathList);
  }
  if (killer.hp <= 0) {
    if (deathList.length == 0) {
      console.log(`Hurray! The gang got rid of Jason!\nNo one died`);
    } else if (deathList.length == 1) {
      console.log(`Hurray! The gang got rid of Jason!\n${deathList} is dead`);
    } else {
      console.log(`Hurray! The gang got rid of Jason!\n${deathList} are dead`);
    }
    break;
  }

  if (survivors.length == 0) {
    console.log(
      `Oh no! Jason managed to kill every member of the gang! Game over!`
    );
    break;
  }
}
