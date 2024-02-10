// ouverture et fermeture des menus burger dans la navbar
let titles = document.querySelectorAll(".title");

titles.forEach(function (item) {
  item.addEventListener("click", function () {
    if (item.classList.contains("full") == false) {
      if (item.id == "main-title" && item.classList.contains("open-title")) {
        console.log("close everything");
        titles.forEach(function (item) {
          item.classList.remove("open-title");
          item.nextElementSibling.classList.remove("open-menu");
        });
      } else {
        item.classList.toggle("open-title");
        item.nextElementSibling.classList.toggle("open-menu");
      }
    }
  });
});

// appel automatique des fonctions au chargement ou redimmensionnement de la page
window.onload = function () {
  navMode();
  navHeight();
  userCheck();
};

window.onresize = function () {
  navMode();
  navHeight();
};

// verrouilage du menu burger principal si taille écran > 960px
function navMode() {
  if (window.innerWidth > 960) {
    // grand écran
    document.getElementById("main-title").classList.add("full");
  } else {
    // smartphone
    document.getElementById("main-title").classList.remove("full");
  }

  // fermeture de tous les menus burgerS
  titles.forEach(function (item) {
    item.classList.remove("open-title");
    item.nextElementSibling.classList.remove("open-menu");
  });
}

// décalage de la zone principale sous la navbar
function navHeight() {
  let nav = document.getElementById("nav");
  let main = document.getElementById("main");
  main.style.paddingTop = parseFloat(nav.offsetHeight * 2) + "px";
  main.style.paddingBottom = parseFloat(nav.offsetHeight) + "px";
  main.style.paddingLeft = parseFloat(nav.offsetHeight) + "px";
  main.style.paddingRight = parseFloat(nav.offsetHeight) + "px";
}

// sélection dynamique des images des cartes en fonction des personnages
let cards = document.querySelectorAll(".card");

cards.forEach(function (item) {
  item.style.backgroundImage = 'url("./characters/' + item.textContent + '.jpg")';
});