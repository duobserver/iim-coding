// Objects are groups of attributes under custom names

let student = {
  name: "Freddy",
  favoriteFood: "Chicken wings",
  city: "Minesota",
};

// Simple

console.log("\tSimple method");

let counter = 0;
let values = Object.values(student);
console.log(values);

values.forEach((value) => {
  counter += value.length;
});

if (counter % 2 == 0) {
  console.log("Even");
} else {
  console.log("Odd");
}

// Complex
// You can use an 'accumulator' to add

console.log("\tComplex method");

let result = 0;
result = values.reduce((acc, value) => acc + value.length, result);
console.log(result + " characters");

if (result % 2 == 0) {
  console.log("Even");
} else {
  console.log("Odd");
}
