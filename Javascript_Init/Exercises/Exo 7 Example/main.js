// Array.foreach is a different way to read array data

let names = [];

names.push("Vincent", "Paul", "Arthur");

// "fonction fléchée" / "arrow" function expression is shorter
names.forEach((name) => {
  name += " va à la pêche"; // equals to "name = name + ..."
  console.log(name);
});
