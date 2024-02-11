// fichier javascript dédié au contôle des pages contenant des cartes

// appel de l'API Harry Potter
async function getCharacters() {
  let rep = await fetch("https://hp-api.onrender.com/api/characters");
  let reponse = await rep.json();
  console.log("got answer");
  return(reponse);
}

// affichage automatique des images des cartes en fonction des personnages
let cards = document.querySelectorAll(".card");
console.log(cards);

async function launch() {
  let characters = await getCharacters();
  console.log("launching");
  cards.forEach((item) => {
    console.log("found item");
    let cardId = item.innerHTML;
    console.log("found id");
    let cardIdTrimmed = cardId.replace(/^\s+|\s+$/gm, "");
    console.log(cardIdTrimmed);
    let cardSpecs = characters.find(a => a.id === cardIdTrimmed);
    console.log(cardSpecs);
    item.style.backgroundImage = `url(${cardSpecs.image})`;

    if (cardSpecs.house == "Gryffindor") {
      item.style.borderColor = "red";
    }

    if (cardSpecs.house == "Slytherin") {
      item.style.borderColor = "green";
    }

    if (cardSpecs.house == "Hufflepuff") {
      item.style.borderColor = "gold";
    }

    if (cardSpecs.house == "Ravenclaw") {
      item.style.borderColor = "cyan";
    }
  });
}

launch();