const formulaire = document.querySelector("#loginForm");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

formulaire.addEventListener("submit", async (event) => {
    event.preventDefault();

    const response = await fetch("http://127.0.0.1:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email.value,
            password: password.value,
        }),
    });

    const result = await response.json();

    if (response.status === 200) {
        const token = result.token;
        localStorage.setItem("token", token);
        localStorage.setItem("notice", `1-Login succeeded`);
        noticeUpdate();
        return;
    } else {
        localStorage.setItem("notice", `0-${result.message}`);
        noticeUpdate();
        return;
    }
});
