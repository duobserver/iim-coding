// let burgers = document.querySelectorAll(".burger-menu");

// burgers.forEach(function (item) {
//   item.addEventListener("click", function () {
//     item.classList.toggle("open")
//   });
// });

let burgers = document.querySelectorAll(".burger-menu p");

burgers.forEach(function (item) {
  item.addEventListener("click", function () {
    let target = document.getElementById(item.textContent);
    if (target.classList.contains("main-menu") == false) {
      target.classList.toggle("open");
    }
  });
});

window.onload = mainMenu();
window.onresize = function () {
  mainMenu();
};

function mainMenu() {
  if (window.innerWidth > 960) {
    document.getElementById("Hogwarts Collection").classList.add("main-menu");
  } else {
    document.getElementById("Hogwarts Collection").classList.remove("main-menu");
  }
  document.getElementById("Hogwarts Collection").classList.remove("open");
}

let cards = document.querySelectorAll(".card");

cards.forEach(function (item) {
  item.style.backgroundImage = 'url("./characters/' + item.textContent + '.jpg")';
});
