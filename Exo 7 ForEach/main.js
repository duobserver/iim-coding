// Array.foreach is a different way to read array data

let fruits = ["apple", "orange", "pear"];

// "clasic" function expression
console.log("\tclassic");
fruits.forEach(function (fruit) {
  console.log(fruit);
});

// "fonction fléchée" / "arrow" function expression is shorter
console.log("\tarrow");
fruits.forEach((fruit) => {
  console.log(fruit);
});
