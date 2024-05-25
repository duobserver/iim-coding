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

    // const res = await fetch(`http://localhost:3000/api/card`, {
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
    let wand = document.querySelector("#cardWand");
    let patronus = document.querySelector("#cardPatronus");

    let actor = document.querySelector("#cardActor");
    let birthday = document.querySelector("#cardBirthday");
    let eyes = document.querySelector("#cardEyes");
    let hairs = document.querySelector("#cardHairs");

    let character = characters.find((item) => item.id == cardId);
    console.log(character);

    name.innerHTML = character.name;
    image.style.backgroundImage = `url(${character.image})`;
    role.innerHTML = character.role;

    if (!character.house == "") {
        house.innerHTML += character.house;

        house.classList.add(character.house);
        document.querySelector("#cardCharacter").classList.add(character.house);
    } else {
        house.innerHTML += "No house";
    }

    blood.innerHTML = character.blood;

    if (!character.wand == "") {
        wand.innerHTML = character.wand;
    } else {
        wand.innerHTML = "No wand";
    }

    if (!character.patronus == "") {
        patronus.innerHTML = character.patronus;
    } else {
        patronus.innerHTML = "No patronus";
    }

    actor.innerHTML = character.actor;

    let date = character.birthday;
    let day = date.split("T")[0];
    birthday.innerHTML = day;

    eyes.innerHTML = character.eyes;
    hairs.innerHTML = character.hairs;
}

setTimeout(fetchCard(), 0);
