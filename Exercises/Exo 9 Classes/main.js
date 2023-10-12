// Classes are groups of attributes under custome names that can be cloned (called instances)

class Warrior {
  constructor(attack, defense) {
    this.attack = attack;
    this.defense = defense;
  }

  getAttack() {
    console.log(
      `The warrior attacks and deals ${this.attack} points of damage!`
    );
  }
}

// You can't call directly the class' methods, you need to create an instance first
let freddy = new Warrior(10, 10);
freddy.getAttack();
