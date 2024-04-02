// paramètres du carrousel
const swiper = new Swiper(".swiper", {
  // Optional parameters
  direction: "horizontal",
  loop: true,
  centeredSlides: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
});

// déclaration des variables
// ciblage des variables css
var root = document.querySelector(":root");

// ciblage des éléments html
let darkCheck = document.querySelector("#darkmode");
let turnOn = document.querySelector("#turnOn");
let turnOff = document.querySelector("#turnOff");
let header = document.querySelector("header");
let burger = document.querySelector(".programmes");
let title = document.querySelector(".title");
let main = document.querySelector("main");
let tabs = document.querySelectorAll(".tab");
let contents = document.querySelectorAll(".content");

// activation des fonctions lorsque la page est chargée
window.onload = function () {
  navHeight();
  darkMode();
};

// activation des fonctions lorsque la page est redimensionnée
window.onresize = function () {
  navHeight();
  darkMode();
};

// contrôle du mode sombre et modification des variables css
function darkMode() {
  console.log("dark");
  if (darkCheck.checked) {
    turnOn.style.display = "none";
    turnOff.style.display = "block";
    root.style.setProperty("--darken-background", "rgba(0, 0, 0, 0.7)");
    root.style.setProperty("--nav-background", "black");
    root.style.setProperty("--hover-color", "#101010");
    root.style.setProperty("--nav-text", "white");
  } else {
    turnOn.style.display = "block";
    turnOff.style.display = "none";
    root.style.setProperty("--darken-background", "");
    root.style.setProperty("--nav-background", "");
    root.style.setProperty("--hover-color", "");
    root.style.setProperty("--nav-text", "");
  }
}

// modification de la hauteur totale de la barre de navigation et fonction de l'espace restant sur l'écran
function navHeight() {
  if (window.innerWidth < 960) {
    contents.forEach(function (item) {
      item.style.paddingTop = parseFloat(title.offsetHeight) + "px";
    });

    let headerHeight = header.offsetHeight;
    console.log(headerHeight);
    burger.style.height = parseFloat(window.innerHeight - headerHeight) + "px";
  } else {
    contents.forEach(function (item) {
      item.style.paddingTop = "";
    });

    burger.style.height = "";
  }
}

// contrôle d'ouverture du menu burger
title.addEventListener("click", function () {
  burger.classList.toggle("open");
});

// sélection de l'article d'axe à afficher en fonction de l'onglet/tab sélectionné
tabs.forEach(function (item) {
  item.addEventListener("click", function () {
    tabs.forEach(function (item) {
      item.classList.remove("tab-active");
    });
    contents.forEach(function (item) {
      item.classList.remove("active");
    });

    this.classList.add("tab-active");

    if (this.classList.contains("tab-cdi")) {
      document.querySelector(".cdi").classList.add("active");
    }

    if (this.classList.contains("tab-an")) {
      document.querySelector(".an").classList.add("active");
    }

    if (this.classList.contains("tab-jv")) {
      document.querySelector(".jv").classList.add("active");
    }

    if (this.classList.contains("tab-cd")) {
      document.querySelector(".cd").classList.add("active");
    }

    if (this.classList.contains("tab-cdeb")) {
      document.querySelector(".cdeb").classList.add("active");
    }

    burger.classList.remove("open");
  });
});
