let gweet = document.querySelector("#gweet");
let gweetOverlay = document.querySelector("#overlay");
let gweetPostClose = document.querySelector("#gweetPost span");

gweet.addEventListener("click", function () {
    gweetOverlay.style.display = "flex";
});

gweetPostClose.addEventListener("click", function () {
    gweetOverlay.style.display = "none";
});