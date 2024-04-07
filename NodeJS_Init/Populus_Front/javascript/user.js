const icon = document.querySelector("#userIcon");
const username = document.querySelector("#userName");
const bio = document.querySelector("#userBio");
const color = document.querySelector("#userColor");
const email = document.querySelector("#userEmail");

const fetchUser = async () => {
    // get profile id to show
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    // if the user wants to see its profile (token way)
    if (urlParams.get("id") == 0) {
        const token = localStorage.getItem("token");

        if (!token) {
            localStorage.setItem("notice", `0-Token not found. Please login to access your profile page`);
            window.location.href = "../html/login.html";
            return;
        }

        const response = await fetch(`http://127.0.0.1:3000/activeUser`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const user = await response.json();

        // if user is authenticated
        if (response.status === 200) {
            // change values to current user data
            document.title = `${user.name} | Populus`;
            icon.style.color = user.color;

            username.innerHTML = user.name;
            username.style.color = user.color;

            email.innerHTML += user.email;
            bio.innerHTML += user.bio;
            color.innerHTML += user.color;

            localStorage.removeItem("notice");
            noticeUpdate();
            return;
            return;
        } else {
            localStorage.setItem("notice", `0-${user.message}`);
            window.location.href = "../html/login.html";
            return;
        }

        // if the user wants others' profiles
    } else {
        const response = await fetch(`http://127.0.0.1:3000/user/${urlParams.get("id")}`, {
            method: "GET",
        });

        const user = await response.json();

        if (response.status === 302) {
            document.title = `${user.name} | Populus`;
            icon.style.color = user.color;

            username.innerHTML = user.name;
            username.style.color = user.color;

            email.innerHTML += user.email;
            bio.innerHTML += user.bio;
            color.innerHTML += user.color;

            localStorage.removeItem("notice");
            noticeUpdate();
            return;
        } else {
            localStorage.setItem("notice", `0-${user.message}`);
            noticeUpdate();
            return;
        }
    }
};

fetchUser();
