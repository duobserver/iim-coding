// Classes are groups of attributes under custome names that can be cloned (called instances)

class Pokemon {
  constructor(name, attack, defense, hp, luck) {
    this.name = name; // str
    this.defense = defense; // int
    this.attack = attack; // int
    this.hp = hp; // int
    this.luck = luck; // percentage
  }

  isLucky() {
    let lucky = Math.floor(Math.random() * 100);
    // console.log(lucky);
    // console.log(lucky >= this.luck);
    return lucky >= this.luck;
  }

  attackPokemon(target) {
    if (this.isLucky()) {
      let damage = this.attack - target.defense;
      target.hp -= damage;

      console.log(
        `${this.name} attacks and deals ${this.attack} points of damage!`
      );
      console.log(`${target.name} lost ${damage} health point(s)`);
    } else {
      console.log(`${this.name} missed!`);
    }

    console.log(
      `${this.name} : ${this.hp} HP left || ${target.name} : ${target.hp} HP left`
    );
  }
}

// You can't call directly the class' methods, you need to create an instance first
let pikachu = new Pokemon("Pikachu", 10, 8, 30, 70);
let charmander = new Pokemon("Charmander", 12, 6, 30, 60);

while (pikachu.hp > 0 && charmander.hp > 0) {
  pikachu.attackPokemon(charmander);
  if (charmander.hp <= 0) {
    console.log("Pikachu won!")
    break;
  }
  charmander.attackPokemon(pikachu);
  if (pikachu.hp <= 0) {
    console.log("Charmander won!")
    break;
  }
}
