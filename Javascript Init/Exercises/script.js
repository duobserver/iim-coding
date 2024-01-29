// gang members class
class Survivor {
  constructor(name, trait, death, damage, both) {
    this.name = ; // name
    this.trait = ; // characteristic
    this.death = ; // death prob.
    this.damage = ; // damage prob.
    this.both = ; // damage and death prob.

    // presenting survivor in the console
    console.log(``);
  }
}

// Jason's class
class Killer {
  constructor() {
    this.name = "";
    this.hp = ;
  }
  next(target) {
    let action = Math.random();

    if (0 <= action < target.death) {
      // if Jason kills someone
      this.hp -= 15;
      console.log(``);
      return 1;
    } else if (target.death <= action < target.death + target.damage) {
      // if someone dodges Jason and deals damage
      this.hp -= 10
      console.log(``);
      return 0;
    } else if (
      target.death + target.damage <=
      target.death + target.damage + target.both
    ) {
      // if someone gets killed but deals damage
      this.hp -= 15;
      console.log(``);
      return 1;
    }
  }
}

let killer = new Killer();

let names = [];

// survivors characteristics: ["trait", death prob., damage prob., damage and death prob.]
let characteristics = [];

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
  if (result == 1) {
    deathList.push(survivors[selection].name);
    survivors.splice(selection, 1);
  }

  // ending conditions
  if (killer.hp <= 0) {
    // if Jason is dead
    if (survivors.length == 0) {
      // and every survivor is dead (rare ending)
      console.log(``);
    } else if (deathList == 0) {
      // and every survivor is alive
      console.log(``);
    } else if (deathList.length == 1) {
      // and one survivor is dead
      console.log(``);
    } else {
      // and multiple survivors are dead
      console.log(``);
    }
    break;
  } else if (survivors.length == 0) {
    // if Jason killed everyone
    console.log(``);
    break;
  }
}
