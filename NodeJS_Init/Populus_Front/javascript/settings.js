// SETTINGS PAGE SCRIPT (LOGIN REQUIRED)

// retrieve DOM elements
let form = document.querySelector("#settingsForm");
let username = document.querySelector("#name");
let email = document.querySelector("#email");
let color = document.querySelector("#color");
let bio = document.querySelector("#bio");
let password = document.querySelector("#password");

let deleteForm = document.querySelector("#deleteForm");
let confirmWord = document.querySelector("#confirm");

// authenticate user and fetch informations
const fetchUser = async () => {
    // get token from local storage
    const token = localStorage.getItem("token");

    // if token does not exist
    if (!token) {
        // reirect to login page with error message
        localStorage.setItem("notice", `0-Token not found. Please login to access the settings page`);
        window.location.href = "../html/login.html";
        return;
    }

    // if token does exist
    const response = await fetch(`http://127.0.0.1:3000/activeUser`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const user = await response.json();

    // if user is authenticated
    if (response.status === 200) {
        // remove previous notice
        localStorage.removeItem("notice");
        noticeUpdate();

        // change settings form value to current user data
        username.value = user.name;
        username.placeholder = user.name;

        email.value = user.email;
        email.placeholder = user.email;

        color.value = user.color;
        bio.innerHTML = user.bio;
        return;
    } else {
        localStorage.setItem("notice", `0-${user.message}`);
        window.location.href = "../html/login.html";
        return;
    }
};

// when user saves settings
form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
        localStorage.setItem("notice", `0-Token not found. Please login to access the settings page`);
        window.location.href = "../html/login.html";
        return;
    }

    const response = await fetch("http://127.0.0.1:3000/user", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            name: username.value,
            email: email.value,
            color: color.value,
            bio: bio.value,
            password: password.value,
            currentPassword: currentPassword.value,
        }),
    });

    const result = await response.json();

    if (response.status === 200) {
        localStorage.setItem("notice", `1-${result.message}`);
        noticeUpdate();
        return;
    } else {
        localStorage.setItem("notice", `0-${result.message}`);
        noticeUpdate();
        return;
    }
});

// when user deletes itself
deleteForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
        localStorage.setItem("notice", `0-Token not found. Please login to access the settings page`);
        window.location.href = "../html/login.html";
        return;
    }

    const response = await fetch("http://127.0.0.1:3000/user", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            confirm: confirmWord.value,
        }),
    });

    const result = await response.json();

    if (response.status === 204) {
        localStorage.setItem("notice", `1-${result.message}`);
        window.location.href = "../html/login.html";
        return;
    } else {
        localStorage.setItem("notice", `0-${result.message}`);
        noticeUpdate();
        return;
    }
});

// deleteForm.addEventListener("submit", async () => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//         localStorage.setItem("notice", `0-Token not found. Please login to delete a user`);
//         window.location.href = "../html/login.html";
//         return;
//     }

//     const response = await fetch("http://127.0.0.1:3000/user", {
//         method: "DELETE",
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//         },
//     });

//     const result = await response.json();

//     if (response.status === 204) {
//         localStorage.setItem("notice", `1-${result.message}`);
//         window.location.href = "../html/login.html";
//         return;
//     } else {
//         localStorage.setItem("notice", `0-${result.message}`);
//         noticeUpdate();
//     }
// });

// auto-launch function when loading page
fetchUser();
