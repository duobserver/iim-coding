let collectionDiv = document.querySelector("#cards");

async function fetchCollection() {
    const token = localStorage.getItem("token");

    if (!token) {
        localStorage.setItem("notification", `Token not found. Please login to access your profile page`);
        window.location.href = "login";
    }

    const res = await fetch(`http://192.168.1.147:3000/api/collection`, {
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
                card.classList.add("Favorite");
                favorite.classList.add("Favorite");
            }

            if (!character.house == "") {
                card.classList.add(character.house);
                card.querySelector(".cardName").classList.add(character.house);
            }

            collectionDiv.appendChild(card);
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
