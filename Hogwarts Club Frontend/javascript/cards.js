//fichier javascript dédié au contôle des pages contenant des cartes

// affichage dynamique des images des cartes en fonction des personnages
let cards = document.querySelectorAll(".card");

// cards.forEach(function (item) {
//   item.style.backgroundImage = 'url("../characters/' + item.textContent + '.jpg")';
//   item.title = item.textContent;
// });

// appel de l'API Harry Potter
async function getCharacters() {
  let rep = await fetch("https://hp-api.onrender.com/api/characters");
  let reponse = await rep.json();
  imageCards(reponse);
}

function imageCards(characters) {
    cards.forEach(item => {
      let cardid = item.id;
      item.style.backgroundImage = `url(${characters[cardid].image})`;
    });
}

getCharacters();