const form = document.querySelector("#signupForm");
const email = document.querySelector("#signupEmail");
const password = document.querySelector("#signupPassword");
const nickname = document.querySelector("#signupNickname");
const age = document.querySelector("#signupAge");
const gender = document.querySelector("#signupGender");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const response = await fetch("http://192.168.1.147:3000/api/user", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email.value,
            password: password.value,
            profile: {
                age: age.value,
                gender: gender.value,
                pseudo: nickname.value,
            },
        }),
    });

    const result = await response.json();

    if (response.status === 201) {
        localStorage.setItem("notification", `Accout successfully created`);
        window.location.href = "login";
        return;
    } else {
        localStorage.setItem("notification", `Error. ${result.message}`);
        notification();
        return;
    }
});
