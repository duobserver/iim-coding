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
// You can use an 'accumulator' to count all the characters

console.log("\tComplex method");

let result = 0;
result = values.reduce((acc, value) => acc + value.length, result);
// console.log(result + " characters"); "Concaténation"
console.log(`${result} characters`); // "Interpolation" USE ALTgr + 7 QUOTES

console.log(result % 2 == 0); // false is odd, true is even

// "Opération Ternaire"
console.log(`Le résultat est ${result % 2 == 0 ? 'even' : 'odd'}`);
//                          condition ? true response : false response