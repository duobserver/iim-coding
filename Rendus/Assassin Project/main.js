// survivors group class
class Survivor {
  constructor(name, trait, death, damage, both) {
    this.name = name; // name of survivor (string)
    this.trait = trait; // trait of survivor (string)
    this.death = death; // death probability (float 0.0 - 1.0)
    this.damage = damage; // damage probability (float 0.0 - 1.0)
    this.both = both; // damage and death probability (float 0.0 - 1.0)

    // presenting the survivor in the console
    console.log(
      `\t${this.name}\n\t(${this.trait}, ${this.death} death, ${this.damage} damage, ${this.both} both)`
    );
  }
}

// Jason's class
class Killer {
  constructor() {
    this.name = "Jason";
    this.hp = 100;
  }

  // what happens now ?
  next(target) {
    let action = Math.random();

    // return true: the target died
    // return false: the target is still alive
    if (0 <= action < target.death) {
      // if Jason kills someone
      console.log(`\t${this.name} killed ${target.name}!`);
      return true;
    } else if (target.death <= action < target.death + target.damage) {
      // if someone dodges Jason and deals damage
      this.hp -= 10;
      console.log(
        `\t${this.name} attacks ${target.name}!\n\tBut ${target.name} dodged him and dealt 10 points!`
      );
      return false;
    } else if (
      target.death + target.damage <=
      target.death + target.damage + target.both
    ) {
      // if someone gets killed but deals damage
      this.hp -= 15;
      console.log(
        `\t${this.name} attacks ${target.name}!\n\t${target.name} dealt 15 points but died!`
      );
      return true;
    }
  }
}

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
  "Rick",
  "Morty",
  "Jenna",
  "Elsa",
];

// survivors characteristics: trait, death prob., damage prob., damage and death prob.
const characteristics = [
  ["Weak", 0.7, 0.2, 0.1],
  ["Scared", 0.6, 0.25, 0.15],
  ["Blondy", 0.5, 0.3, 0, 25],
  ["Nerd", 0.4, 0.35, 0.25],
  ["Assistant", 0.3, 0.5, 0.2],
  ["Agile", 0.1, 0.6, 0.3],
  ["Sporty", 0.2, 0.7, 0.1],
  ["Rageous", 0.3, 0.4, 0.3],
  ["Shooter", 0.2, 0.65, 0.15],
];

// game arrays
let survivors = [];
let deathList = [];

// creating survivors instances
console.log("The gang ---");
for (let i = 0; i < 5; i++) {
  let name = Math.floor(Math.random() * names.length);
  let char = Math.floor(Math.random() * characteristics.length);
  survivors.push(
    new Survivor(
      names[name],
      characteristics[char][0],
      characteristics[char][1],
      characteristics[char][2],
      characteristics[char][3]
    )
  );
  names.splice(name, 1);
}

// running the game
console.log("Let's play ! ---");
while (killer.hp > 0 && survivors.length != 0) {
  selection = Math.floor(Math.random() * survivors.length);
  result = killer.next(survivors[selection]);

  // if someone dies, its instance is removed from the list
  if (result) {
    deathList.push(survivors[selection].name);
    survivors.splice(selection, 1);
  }

  // ending conditions
  if (killer.hp <= 0) {
    // if Jason dies
    if (survivors.length == 0) {
      // and everyone else is dead
      console.log(`End---\n\tEveryone died!`);
    } else if (deathList == 0) {
      // and everyone is still alive
      console.log(
        `End ---\n\tHurray! The gang got rid of Jason!\n\tEveryone survived`
      );
    } else if (deathList.length == 1) {
      // and one survivor is dead
      console.log(
        `End ---\n\tHurray! The gang got rid of Jason!\n\tBut ${deathList} is dead`
      );
    } else {
      // and multiple survivors are dead
      let prompt = "";
      for (let i = 0; i < deathList.length - 1; i++) {
        prompt += deathList[i] + ", ";
      }
      prompt += "and ";
      prompt += deathList.slice(-1);
      console.log(
        `End ---\n\tHurray! The gang got rid of Jason!\n\tBut ${prompt} are dead`
      );
    }
    break;
  } else if (survivors.length == 0) {
    // Jason killed everyone
    console.log(
      `End ---\n\tOh no! Jason managed to kill every member of the gang! Game over!`
    );
    break;
  }
}
