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

    console.log(characters);

    console.log(collection);

    collection.forEach((element) => {
        character = characters.find((item) => item.id === element.id);

        let card = document.createElement("div");
        card.innerHTML = `
        <a class="cardName"></a>
        <div class="cardImage"></div>
        <div class="cardStats">
        <p class="quantity"></p>
        <span class="material-symbols-rounded" title="favorite">favorite</span>
        </div>
        `;

        card.querySelector(".cardName").innerHTML = character.name;
        card.querySelector(".cardName").href = `card&id=${character.id}`;

        card.querySelector(".cardImage").style.backgroundImage = `url(${character.image})`;
        card.querySelector(".quantity").innerHTML = element.quantity;

        let favorite = card.querySelector("span");

        if (element.isFavorite == true) {
            favorite.classList.add("Favorite");
            card.classList.add("Favorite");
        }

        card.classList.add("card");
        if (!character.house == "") {
            card.classList.add(character.house);
        }

        collectionDiv.appendChild(card);
    });
}

fetchCollection();
