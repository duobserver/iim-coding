// conditions allows you to do simple comparisons

let a = 4;
let b = 4;
let c = 3;

if (a == b) {
  console.log("a is b");
} else {
  console.log("a is not b");
}

if (c < b && a + c != 3) {
  console.log("ok");
} else {
  console.log("raté");
}

function check() {
  if (document.getElementById("checkme").checked == true) {
    console.log("checked");
  } else {
    console.log("not checked");
  }
}
