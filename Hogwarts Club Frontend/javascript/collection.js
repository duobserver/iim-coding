//fichier javascript dédié à la collection des cartes possédes
// affichage dynamique des images des cartes en fonction des personnages
let cards = document.querySelectorAll(".card");

cards.forEach(function (item) {
  item.style.backgroundImage = 'url("../characters/' + item.textContent + '.jpg")';
});