function auth() {
    let urlParams = new URLSearchParams(window.location.search);

    let auth = urlParams.get("auth");
    console.log(auth);

    document.querySelector(`#${auth}Link`).classList.add("activeAuth");
    document.querySelector(`#${auth}Form`).classList.add("activeAuth");
}

auth();
