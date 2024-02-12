// fichier javascript dédié au contôle des pages contenant des cartes

// appel de l'API Harry Potter
async function getCharacters() {
  let rep = await fetch("https://hp-api.onrender.com/api/characters");
  let reponse = await rep.json();
  console.log("got answer");
  return reponse;
}

// affichage automatique des images des cartes en fonction des personnages
let cards = document.querySelectorAll(".card");
console.log(cards);

async function launch() {
  let characters = await getCharacters();
  cards.forEach((item) => {
    let cardId = item.innerHTML;
    let cardIdTrimmed = cardId.replace(/^\s+|\s+$/gm, "");
    let cardSpecs = characters.find((a) => a.id === cardIdTrimmed);
    item.style.backgroundImage = `url(${cardSpecs.image})`;
    item.title = cardSpecs.name;

    if (cardSpecs.house == "Gryffindor") {
      item.style.borderColor = "red";
      item.classList.add("Gryffindor");
    }

    if (cardSpecs.house == "Slytherin") {
      item.style.borderColor = "green";
      item.classList.add("Slytherin");
    }

    if (cardSpecs.house == "Hufflepuff") {
      item.style.borderColor = "gold";
      item.classList.add("Hufflepuff");
    }

    if (cardSpecs.house == "Ravenclaw") {
      item.style.borderColor = "cyan";
      item.classList.add("Ravenclaw");
    }
  });
}

launch();

let filters = document.querySelectorAll("#filters button");

filters.forEach((element) => {
  element.addEventListener("click", function () {
    cards.forEach((element) => {
      element.style.display = "";
    });
    if ((element.innerHTML != "Pas de filtres")) {
      cards.forEach((element) => {
        if (!element.classList.contains(this.innerHTML)) {
          element.style.display = "none";
        }
      });
    }
  });
});
