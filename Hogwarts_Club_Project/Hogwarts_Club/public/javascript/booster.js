let cards = document.querySelector("#cards");
let boosterStatus = document.querySelector("#boosterStatus");

async function fetchBooster() {
    const token = localStorage.getItem("token");

    if (!token) {
        localStorage.setItem("notification", `Token not found. Please login to access your profile page`);
        window.location.href = "login";
    }

    const res = await fetch(`http://10.2.163.245:3000/api/booster`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    let booster = await res.json();
    const boosterPack = booster.boosterPack;

    if (res.status === 200) {
        if (boosterPack) {
            boosterStatus.innerHTML = `Your daily booster has arrived. Check out the cards you won below.`;
            const characters = await fetchCharacters();

            for (const key of boosterPack) {
                const character = characters.find((item) => item.id === key);

                let card = document.createElement("div");

                card.innerHTML = `
                <a class="cardCharacter">
                    <p class="cardName"></p>
                    <div class="cardImage"></div>
                </a>`;

                card.classList.add("card");
                card.title = character.name;
                card.querySelector(".cardCharacter").href = `card?id=${character.id}`;
                card.querySelector(".cardName").innerHTML = character.name;

                card.querySelector(".cardImage").style.backgroundImage = `url(${character.image})`;

                if (!character.house == "") {
                    card.classList.add(character.house);
                    card.querySelector(".cardName").classList.add(character.house);
                }
                cards.appendChild(card);
            }
        } else {
            boosterStatus.innerHTML = `Your next booster will arrive in <span class="time">${booster.hours}</span> hour(s), <span class="time">${booster.minutes}</span> minute(s) and <span class="time">${booster.seconds}</span> second(s).`;
        }
    } else {
        localStorage.setItem("notification", booster.message);
        window.location.href = "/login";
    }
}

window.addEventListener("load", () => {
    fetchBooster();
});
