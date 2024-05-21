let cardsDiv = document.querySelector("#cards");

async function fetchCatalogue() {
    const characters = await fetchCharacters();
    console.log(characters);

    characters.forEach((element) => {
        let card = document.createElement("div");
        card.innerHTML = `
        <a class="cardCharacter">
            <p class="cardName"></p>
            <div class="cardImage"></div>
        </a>
        `;

        card.querySelector(".cardCharacter").href = `card?id=${element.id}`;

        card.querySelector(".cardName").innerHTML = element.name;
        card.querySelector(".cardImage").style.backgroundImage = `url(${element.image})`;

        card.classList.add("card");
        if (!element.house == "") {
            card.classList.add(element.house);
        }

        cardsDiv.appendChild(card);
    });
}

fetchCatalogue();
