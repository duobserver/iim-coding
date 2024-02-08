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
  let main = document.getElementById("main");
  let overlay = document.getElementById("overlay");
  let nav = document.getElementById("nav");
  main.style.paddingTop = parseFloat(nav.offsetHeight) + "px";
  overlay.style.paddingTop = parseFloat(nav.offsetHeight) + "px";
}

// changement du mode de connexion
let connexionModes = document.querySelectorAll(".connexionMode");
let forms = document.querySelectorAll("#connexionForm form");

connexionModes.forEach(function (item) {
  item.addEventListener("click", function () {
    connexionModes.forEach(function (item) {
      item.classList.remove("open-title");
    });
    forms.forEach(function (item) {
      item.classList.remove("active");
    });
    item.classList.toggle("open-title");
    document.querySelector("." + item.id).classList.add("active");
  });
});

forms.forEach(function (item) {
  item.addEventListener("submit", function (event) {
  // sauvegarde des champs après envoi
  event.preventDefault();
  console.log("formulaire envoyé");

  // purge de la liste des erreurs
  document.querySelectorAll(".notif-erreur li").forEach(function (item) {
    item.remove();
  });
});
})


// sélection dynamique des images des cartes en fonction des personnages
let cards = document.querySelectorAll(".card");

cards.forEach(function (item) {
  item.style.backgroundImage = 'url("./characters/' + item.textContent + '.jpg")';
});
