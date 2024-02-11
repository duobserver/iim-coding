// appel de l'API Harry Potter
async function getCharacters() {
  let rep = await fetch("https://hp-api.onrender.com/api/characters");
  let reponse = await rep.json();
  catalogue(reponse);
}

// affichage des 24 premiers personnages sous la forme de cartes
function catalogue(characters) {
  for (let i = 0; i < 25; i++) {
    let card = document.createElement("div");
    card.innerHTML = `
        ${characters[i].name}
    `;
    card.classList.add("card");
    card.style.backgroundImage = `url(${characters[i].image})`;
    document.querySelector(".collection").appendChild(card);
  }
}

getCharacters();