async function fetchProfile() {
    const urlParams = new URLSearchParams(window.location.search);
    const memberId = Number(urlParams.get("id"));

    console.log(memberId);

    var res = await fetch(`http://192.168.1.147:3000/api/user/${memberId}`, {
        method: "GET",
    });

    const member = await res.json();
    console.log(member);

    if (res.status === 302) {
        let memberIcon = document.querySelector("#memberIcon");
        memberIcon.innerHTML = `sentiment_${member.icon}`;
        memberIcon.style.color = member.color;

        document.querySelector("#memberName").innerHTML = member.pseudo;

        if (!member.biography == "") {
            document.querySelector("#memberBio").innerHTML = member.biography;
        } else {
            document.querySelector("#memberBio").innerHTML = "No biography";
            document.querySelector("#memberBio").style.color = "var(--hover-color)";
        }

        document.querySelector("#memberId").innerHTML += `<span class="memberInfo"> ${member.userId}</span>`;
        document.querySelector("#memberAge").innerHTML += `<span class="memberInfo"> ${member.age}</span>`;
        document.querySelector("#memberGender").innerHTML += `<span class="memberInfo"> ${member.gender}</span>`;

        let date = member.joinedOn;
        let day = date.split("T")[0];
        document.querySelector("#memberJoined").innerHTML += `<span class="memberInfo"> ${day}</span>`;
        document.querySelector("#memberColor").innerHTML += `<span class="memberInfo"> ${member.color}</span>`;

        document.querySelector("#memberCollectionTitle").innerHTML = `${member.pseudo}'s card collection`

    } else {
        localStorage.setItem("notification", member.message);
        window.location.href = "/members";
    }
}

async function fetchProfileCollection() {
    const urlParams = new URLSearchParams(window.location.search);
    const memberId = Number(urlParams.get("id"));

    console.log(memberId);

    var res = await fetch(`http://192.168.1.147:3000/api/collection/${memberId}`, {
        method: "GET",
    });

    const characters = await fetchCharacters();

    const collection = await res.json();
    console.log(collection);

    if (res.status === 302) {
        let cardsDiv = document.querySelector("#cards");

        collection.forEach((element) => {
            const character = characters.find((item) => item.id === element.id);

            let card = document.createElement("div");
            card.innerHTML = `
        <a class="cardName"></a>
        <div class="cardImage"></div>
        `;

            card.querySelector(".cardName").innerHTML = character.name;
            card.querySelector(".cardName").href = `card?id=${character.id}`;

            card.querySelector(".cardImage").style.backgroundImage = `url(${character.image})`;

            card.classList.add("card");
            if (!character.house == "") {
                card.classList.add(character.house);
            }

            cardsDiv.appendChild(card);
        });
    } else {
        localStorage.setItem("notification", collection.message);
        window.location.href = "/members";
    }
}

window.addEventListener("load", async () => {
    fetchProfile();
    fetchProfileCollection();
});
