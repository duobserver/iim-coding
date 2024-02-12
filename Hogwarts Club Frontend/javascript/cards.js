// fichier javascript dédié au contôle des pages contenant des cartes

// appel de l'API Harry Potter
async function getCharacters() {
  let rep = await fetch("https://hp-api.onrender.com/api/characters");
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
    <div class="image">${temp}</div>
    <span class="material-symbols-rounded favorite"> favorite </span>
    `;
    element.id = temp;
    let cardSpecs = characters.find((a) => a.id === temp);
    element.classList.add(`${cardSpecs.house}`);
    element.title = cardSpecs.name;
  });

  let images = document.querySelectorAll(".card .image");
  images.forEach((element) => {
    console.log(element.innerHTML)
    let cardSpecs = characters.find((a) => a.id === element.innerHTML);
    element.style.backgroundImage = `url(${cardSpecs.image})`
  });

  let favorites = document.querySelectorAll(".card .favorite");
  favorites.forEach((element) => {
    element.addEventListener("click", function () {
      element.classList.toggle("faved");
    });
  });

  // cards.forEach((item) => {
  //   let cardId = item.innerHTML;
  //   let cardIdTrimmed = cardId.replace(/^\s+|\s+$/gm, "");
  //   let cardSpecs = characters.find((a) => a.id === cardIdTrimmed);
  //   item.style.backgroundImage = `url(${cardSpecs.image})`;
  //   item.title = cardSpecs.name;

  //
  // });
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
