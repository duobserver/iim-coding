// appel de l'API Harry Potter
async function getIDs() {
  let rep = await fetch("https://hp-api.onrender.com/api/characters");
  let reponse = await rep.json();
  return reponse;
}

async function launch() {
  let characters = await getIDs();
  for (let i = 0; i < 25; i++) {
    let card = document.createElement("div");
    card.innerHTML = `
      ${characters[i].id}
    `;
    card.classList.add("card");
    card.id = characters[i].id;
    card.style.backgroundImage = `url(${characters[i].image})`;
    card.title = characters[i].name;
    document.querySelector(".collection").appendChild(card);
  }
}

launch();
