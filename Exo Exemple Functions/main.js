// Functions can do a lot of complex tasks that can be launched within JS or from a linked HTML file

let a = "Jean";
let b = "Paul";

function checkName(name1, name2) {
  if (name1 == name2) {
    return true;
  } else {
    return false;
  }
}

console.log(checkName(a, b));

// Faster:

// function checkName(name1, name2) {
//   return name1 == name2;
// }
// console.log(checkName(a, b));

// 'return var1 symb. var2;' works for a lot of situations
// 'return var1 + var2;' will return an int or else depending on the number type
