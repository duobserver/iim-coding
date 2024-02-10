//fichier javascript dédié au contôle des pages contenant des cartes

// affichage dynamique des images des cartes en fonction des personnages
let cards = document.querySelectorAll(".card");

cards.forEach(function (item) {
  item.style.backgroundImage = 'url("../characters/' + item.textContent + '.jpg")';
  item.title = item.textContent;
});
