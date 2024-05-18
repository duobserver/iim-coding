let collectionDiv = document.querySelector("#cards");

async function fetchCard() {
    const token = localStorage.getItem("token");

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    console.log(urlParams);

    const cardId = urlParams.get("id");
    console.log(cardId);

    // if (!token) {
    //     localStorage.setItem("notification", `Token not found. Please login to access your profile page`);
    //     window.location.href = "login";
    // }

    // const res = await fetch(`http://192.168.1.147:3000/api/card`, {
    //     method: "GET",
    //     headers: {
    //         Authorization: `Bearer ${token}`,
    //     },
    // });

    // const collection = await res.json();

    const characters = await fetchCharacters();

    console.log(characters);

    let name = document.querySelector("#cardName");
    let image = document.querySelector("#cardImage");
    let role = document.querySelector("#cardRole");
    let house = document.querySelector("#cardHouse");
    let blood = document.querySelector("#cardBlood");
    let actor = document.querySelector("#cardActor");
    let eyes = document.querySelector("#cardEyes");
    let hairs = document.querySelector("#cardHairs");

    let character = characters.find((item) => item.id == cardId);
    console.log(character);

    name.innerHTML = character.name;
    image.style.backgroundImage = `url(${character.image})`;
    role.innerHTML += character.role;
    house.innerHTML += character.house;
    if (!character.house == "") {
        house.classList.add(character.house);
        image.classList.add(character.house);
    }

    blood.innerHTML += character.blood;
    actor.innerHTML += character.actor;
    eyes.innerHTML += character.eyes;
    hairs.innerHTML += character.hairs;
}

setTimeout(fetchCard(), 0);
