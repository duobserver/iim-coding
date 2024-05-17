const form = document.querySelector("#loginForm");
const email = document.querySelector("#loginEmail");
const password = document.querySelector("#loginPassword");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const response = await fetch("http://192.168.1.147:3000/api/login", {
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
        localStorage.setItem("notification", `Login succeeded`);
        notification();
        return;
    } else {
        localStorage.setItem("notification", `${result.message}`);
        notification();
        return;
    }
});
