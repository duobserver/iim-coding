titles = document.querySelectorAll(".main-title, .sub-title")

navMode();
navHeight();

window.onresize = function () {
    navMode();
    navHeight();
};

titles.forEach(element => {
    element.addEventListener("click", function () {
        if (element.classList.contains("main-title")) {
            
        } else {
            
        }
    })
});

function navMode() {
    if (window.innerWidth > 960) {
        // grand écran
        let main = document.querySelector(".main-title");
        main.classList.add("full");
        main.classList.remove("open-main-title");
        main.nextElementSibling.classList.remove("open-main-menu");
        document.querySelector("#open-menu-span").style.display = "none";
        document.querySelector("#close-menu-span").style.display = "none";

    } else {
        // smartphone
        document.querySelector(".main-title").classList.remove("full");
        document.querySelector("#open-menu-span").style.display = "block";
        document.querySelector("#close-menu-span").style.display = "none";
    }

    // fermeture de tous les menus burgers
    titles.forEach(function (item) {
        item.classList.remove("open-title");
        item.nextElementSibling.classList.remove("open-menu");
    });
}

// décalage de la zone principale sous la navbar
function navHeight() {
    let nav = document.querySelector("nav");
    let main = document.querySelector("main");
    main.style.paddingTop = parseFloat(nav.offsetHeight * 1.5) + "px";
    main.style.paddingBottom = parseFloat(nav.offsetHeight) + "px";
    main.style.paddingLeft = parseFloat(nav.offsetHeight) + "px";
    main.style.paddingRight = parseFloat(nav.offsetHeight) + "px";
}
