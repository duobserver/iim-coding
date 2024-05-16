let collectionDiv = document.querySelector("#cards");

async function fetchCollection() {
    const token = localStorage.getItem("token");

    if (!token) {
        localStorage.setItem("notice", `0-Token not found. Please login to access your profile page`);
        window.location.href = "../html/login.html";
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
        <p class="cardName"></p>
        <div class="cardImage"></div>
        <div class="cardStats">
        <p class="quantity"></p>
        <span class="material-symbols-rounded" title="favorite">favorite</span>
        </div>
        `;

        card.querySelector(".cardName").innerHTML = character.name;
        card.querySelector(".cardImage").style.backgroundImage = `url(${character.image})`;
        card.querySelector(".quantity").innerHTML = element.quantity;

        let favorite = card.querySelector("span");

        if (element.isFavorite == true) {
            favorite.classList.add("faved");
            card.classList.add("faved");
        }
        
        card.classList.add("card", character.house);

        collectionDiv.appendChild(card);
    });
}

fetchCollection();
