let searchInput = document.querySelector("#searchMember");
let membersDiv = document.querySelector("#members");

async function search() {
    console.log(searchInput.value);
    if (!searchInput.value == "") {
        var res = await fetch(`http://10.2.163.245:3000/api/members/${searchInput.value}`, {
            method: "GET",
        });
    } else {
        var res = await fetch(`http://10.2.163.245:3000/api/members`, {
            method: "GET",
        });
    }

    const members = await res.json();
    console.log(members);

    if (res.status == 200) {
        membersDiv.innerHTML = "";
        members.forEach((member) => {
            let profile = document.createElement("a");
            profile.innerHTML = `
                <span class="material-symbols-rounded memberIcon"> sentiment_${member.icon} </span>
                <span class="memberName">${member.pseudo}</span>
                `;
            profile.classList.add("member");
            profile.href = `/profile?id=${member.userId}`;
            profile.querySelector(".memberIcon").style.color = member.color;
            membersDiv.appendChild(profile);
        });
    } else {
        localStorage.setItem("notification", members.message);
    }
}

searchInput.addEventListener("input", async () => {
    await search();
});

window.addEventListener("load", async () => {
    await search();
});
