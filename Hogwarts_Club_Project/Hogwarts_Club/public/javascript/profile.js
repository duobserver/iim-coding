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
    } else {
        localStorage.setItem("notification", member.message);
        window.location.href = "/login";
    }
}

window.addEventListener("load", async () => {
    fetchProfile();
});
