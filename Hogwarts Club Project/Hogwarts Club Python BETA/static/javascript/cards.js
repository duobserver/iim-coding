function fecthCharacters() {
  return fetch(`https://hp-api.lainocs.fr/characters`).then((response) => response.json());
}

async function displayCharacters() {
  const data = await fecthCharacters();
  let cards = document.querySelectorAll(".card");

  cards.forEach((element) => {
    console.log(typeof +element.id);
    element.classList.add(`${data[+element.id].house}`)
    element.querySelector(".cardName").innerHTML = data[+element.id].name
    element.querySelector(".cardImage").style.backgroundImage = `url(${data[+element.id].image})`;
  });
}

displayCharacters();
