let hours = document.querySelector("#hours");
let minutes = document.querySelector("#minutes");
let seconds = document.querySelector("#seconds");

async function fetchBooster() {
    const token = localStorage.getItem("token");

    if (!token) {
        localStorage.setItem("notification", `Token not found. Please login to access your profile page`);
        window.location.href = "login";
    }

    const res = await fetch(`http://192.168.1.147:3000/api/booster`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    let booster = await res.json();

    console.log(booster);

    hours.innerHTML = booster.hours;
    minutes.innerHTML = booster.minutes;
    seconds.innerHTML = booster.seconds;

    // while (!booster.hours == 0 && !booster.minutes == 0 && !booster.seconds == 0) {
    //     setTimeout(function () {
    //         hours.innerHTML = booster.hours;
    //         minutes.innerHTML = booster.minutes;
    //         seconds.innerHTML = booster.seconds;
    //     }, 1000);
    // }

    // characters.forEach((element) => {
    //     let card = document.createElement("div");
    //     card.innerHTML = `
    //     <a class="cardName"></a>
    //     <div class="cardImage"></div>
    //     `;

    //     card.querySelector(".cardName").innerHTML = element.name;
    //     card.querySelector(".cardName").href = `card?id=${element.id}`;

    //     card.querySelector(".cardImage").style.backgroundImage = `url(${element.image})`;

    //     card.classList.add("card");
    //     if (!element.house == "") {
    //         card.classList.add(element.house);
    //     }

    //     cardsDiv.appendChild(card);
    // });
}

fetchBooster();
