function fecthCharacters() {
  return fetch(`https://hp-api.lainocs.fr/characters`).then((response) => response.json());
}

async function displayCharacters() {
  const data = await fecthCharacters();
  let cards = document.querySelectorAll(".card");
  let cardLinks = document.querySelectorAll(".cardLink");

  cards.forEach((element) => {
    console.log(typeof +element.id);
    element.style.backgroundImage = `url(${data[+element.id-1].image})`;
  });

  cardLinks.forEach(element => {
    element.setAttribute("href", `{{ url_for("card", character=${+element.id}) }}`);
    element.classList.add(data[+element.id].house)
  });
}

displayCharacters();
