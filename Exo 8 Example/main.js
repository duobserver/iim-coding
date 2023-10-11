// Objects are groups of attributes under custom names

let student = {
  name: "Freddy",
  favoriteFood: "Chicken wings",
  city: "Minesota",
};

// Simple
let counter = 0;
let values = Object.values(student);
console.log(values);

values.forEach((value) => {
  counter += value.length;
});

if (counter % 2 == 0) {
  console.log("Pair");
} else {
  console.log("Impair");
}
