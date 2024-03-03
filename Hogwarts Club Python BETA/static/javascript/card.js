// javascript file for card.html

function fecthCharacters() {
    // get all the the characters in the database
    return fetch(`https://hp-api.lainocs.fr/characters`).then((response) => response.json());
}

async function displayCharacter() {
    const data = await fecthCharacters();

    // find the correct character and post its characteristics
    let cardId = document.querySelector(".card").id;
    
    document.querySelector("#image").style.backgroundImage = `url(${data[+cardId].image})`;

    document.querySelector("#image").classList.add(`${data[+cardId].house}`);

    let specs = document.querySelectorAll(".spec");
    specs.forEach((spec) => {
        spec.innerHTML += `${data[+cardId][spec.id]}`;
    });
}

displayCharacter();
