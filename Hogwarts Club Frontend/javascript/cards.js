// fichier javascript dédié au contôle des pages contenant des cartes

// appel de l'API Harry Potter
async function getCharacters() {
  let rep = await fetch("https://hp-api.lainocs.fr/characters");
  let reponse = await rep.json();
  console.log("got answer");
  return reponse;
}

// affichage automatique des images des cartes en fonction des personnages
async function launch() {
  let characters = await getCharacters();
  let cards = document.querySelectorAll(".card");
  cards.forEach((element) => {
    let temp = element.innerHTML;
    element.innerHTML = `
    <a class="cardLink">
      <p class="cardTitle"></p>
      <div class="cardImage"></div>
    </a>
    <span class="material-symbols-rounded favorite"> favorite </span>
    `;
    element.id = temp;
    let cardSpecs = characters[temp];

    element.title = cardSpecs.name;
    element.classList.add(`${cardSpecs.house}`);

    element.querySelector(".cardLink").setAttribute("href", `card.html?id=${temp}`);
    element.querySelector(".cardTitle").innerHTML = cardSpecs.name;
    element.querySelector(".cardImage").style.backgroundImage = `url(${cardSpecs.image})`;
    element.querySelector(".favorite").addEventListener("click", function () {
      element.querySelector(".favorite").classList.toggle("faved");
    });
  });
}

launch();

let filters = document.querySelectorAll("#filters button");

filters.forEach((element) => {
  let cards = document.querySelectorAll(".card");
  element.addEventListener("click", function () {
    cards.forEach((element) => {
      element.style.display = "";
    });
    if (element.innerHTML != "Pas de filtres") {
      cards.forEach((element) => {
        if (!element.classList.contains(this.innerHTML)) {
          element.style.display = "none";
        }
      });
    }
  });
});
