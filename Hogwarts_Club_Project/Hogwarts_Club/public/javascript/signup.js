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
                name: nickname.value,
                age: age.value,
                gender: gender.value,
            },
        }),
    });

    const result = await response.json();

    if (response.status === 201) {
        localStorage.setItem("notice", `1-Accout successfully created`);
        window.location.href = "login";
        return;
    } else {
        localStorage.setItem("notice", `0-${result.message}`);
        noticeUpdate();
        return;
    }
});

localStorage.removeItem("notice");
noticeUpdate();