// appel de l'API Harry Potter
async function getIDs() {
  let rep = await fetch("https://hp-api.lainocs.fr/characters");
  let reponse = await rep.json();
  return reponse;
}

async function launch() {
  let characters = await getIDs();
  for (let i = 0; i < 31; i++) {
    let card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
    <a href="card.html?id=${i}" class="cardLink">
      <p class="cardTitle">${characters[i].name}</p>
      <div class="cardImage" style="background-image: url(${characters[i].image})"></div>
    </a>
    `;
    
    card.id = characters[i].id;
    card.title = characters[i].name;
    document.querySelector(".collection").appendChild(card);
  }
}

launch();
