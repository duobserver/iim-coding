let collectionDiv = document.querySelector("#cards");

async function fetchCollection() {
    const token = localStorage.getItem("token");

    if (!token) {
        localStorage.setItem("notification", `Token not found. Please login to access your profile page`);
        window.location.href = "login";
    }

    const res = await fetch(`http://localhost:3000/api/collection`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const collection = await res.json();

    const characters = await fetchCharacters();

    if (res.status === 200) {
        console.log(characters);

        console.log(collection);

        let cardToGive = document.querySelector("#tradeCardToGive");
        let cardToReceive = document.querySelector("#tradeCardToReceive");

        for (const character of characters) {
            let receiveCard = document.createElement("option");
            receiveCard.value = character.name;
            receiveCard.innerHTML = character.name;

            cardToReceive.appendChild(receiveCard);
        }

        for (const wizard of collection) {
            const character = characters.find((item) => item.id === wizard.id);

            let card = document.createElement("div");
            card.innerHTML = `
        <a class="cardCharacter">
            <p class="cardName"></p>
            <div class="cardImage"></div>
        </a>
        <div class="cardStats">
            <p class="cardQuantity" title="You have ${wizard.quantity} copy/ies of this card"></p>
            <a class="cardFavorite" title="Set this card as favorite"><span class="material-symbols-rounded">favorite</span></a>
            
        </div>
        `;

            card.classList.add("card");
            card.title = character.name;
            card.querySelector(".cardCharacter").href = `card?id=${character.id}`;
            card.querySelector(".cardName").innerHTML = character.name;

            card.querySelector(".cardImage").style.backgroundImage = `url(${character.image})`;
            card.querySelector(".cardFavorite").id = character.id;
            card.querySelector(".cardQuantity").innerHTML = wizard.quantity;

            let favorite = card.querySelector(".cardFavorite");

            if (wizard.isFavorite == true) {
                favorite.classList.add("Favorite");
            }

            if (!character.house == "") {
                card.classList.add(character.house);
                card.querySelector(".cardName").classList.add(character.house);
            }

            collectionDiv.appendChild(card);

            let giveCharacter = document.createElement("option");
            giveCharacter.value = character.name;
            giveCharacter.innerHTML = character.name;

            cardToGive.appendChild(giveCharacter);
        }
    } else {
        localStorage.setItem("notification", `Error: ${collection.message}`);
        window.location.href = "/login";
    }
}

window.addEventListener("load", async () => {
    await fetchCollection();
    filter();
    favorite();
});
