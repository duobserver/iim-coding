let cards = document.querySelector("#cards");

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
    const boosterPack = booster.boosterPack;

    if (res.status === 200) {
        if (boosterPack) {
            for (const key of boosterPack) {
                let card = document.createElement("a");
                card.id = key;
                cards.appendChild(card);
            }
        } else {
            cards.innerHTML = `<div>Your next booster will arrive in <span class="time">${booster.hours}</span> hour(s), <span class="time">${booster.minutes}</span> minute(s) and <span class="time">${booster.seconds}</span> second(s).</div>`;
        }
    } else {
        localStorage.setItem("notification", res.message);
    }
}

window.addEventListener("load", () => {
    fetchBooster();
});
