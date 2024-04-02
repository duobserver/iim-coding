// triple equal "===" is a strict comparator, it verifies value AND type

let a = 4;
let b = "4";
let c = 3;

if (a === b) {
  console.log("ok");
} else {
  console.log("raté");
}
