const form = document.querySelector("#signupForm");
const username = document.querySelector("#name");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const response = await fetch("http://127.0.0.1:3000/user", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: username.value,
            email: email.value,
            password: password.value,
        }),
    });

    const result = await response.json();

    if (response.status === 201) {
        localStorage.setItem("notice", `1-${result.message}`);
        window.location.href = "../html/login.html";
        return;
    } else {
        localStorage.setItem("notice", `0-${result.message}`);
        noticeUpdate();
        return;
    }
});

localStorage.removeItem("notice");
noticeUpdate();
