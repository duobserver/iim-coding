// While is dangerous loop type, use 'break' for exiting loop and 'continue' to go back to top of the loop

let a = 3;

while (a < 9) {
  a++;
  if (a == 8) {
    break;
  } else if (a == 7) {
    continue;
  }
  console.log(a);
}
