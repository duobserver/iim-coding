// general purpose javascript
titles = document.querySelectorAll(".main-title, .sub-title");

titles.forEach((title) => {
    title.addEventListener("click", function () {
        // when the user clicks on a navbar title
        if (title.classList.contains("main-title")) {
            // if the clicked title is the main menu title

            if (title.classList.contains("mobile")) {
                // if the navbar is in mobile mode

                if (title.classList.contains("open-title")) {
                    // if the main menu is opened, close every menu (main and sub)

                    closeAll();
                } else {
                    // if the main menu is closed, open it

                    title.classList.add("open-title");
                    title.nextElementSibling.classList.add("open-menu");
                }
            }
        } else {
            // if the clicked title is a submenu title

            let previous_opened_sub_title = document.querySelector(".sub-title.open-title");
            // look for a previously opened submenu through submenu titles

            if (previous_opened_sub_title && previous_opened_sub_title != title) {
                // if a different submenu has been previously opened, close it

                previous_opened_sub_title.classList.remove("open-title");
                previous_opened_sub_title.nextElementSibling.classList.remove("open-menu");
            }

            title.classList.toggle("open-title");
            title.nextElementSibling.classList.toggle("open-menu");
        }

        updateOverlay();
    });
});

function closeAll() {
    // close all the navbar menus (main and sub)
    titles.forEach((title) => {
        title.classList.remove("open-title");
        title.nextElementSibling.classList.remove("open-menu");
    });
}

function updateOverlay() {
    // scan for any opened navbar menu other than the main menu in big screen mode
    if (document.querySelector(".open-title:not(.full)")) {
        console.log("opened menus detected");
        document.querySelector("#overlay").style.visibility = "visible";
    } else {
        document.querySelector("#overlay").style.visibility = "";
    }
}

function navMode() {
    // close all menus
    closeAll();

    if (window.innerWidth > 960) {
        // big screen mode
        document.querySelector(".main-title").classList.remove("mobile");
        document.querySelector(".main-menu").classList.add("open-menu");
        document.querySelector("#open-menu-span").style.display = "none";
        document.querySelector("#close-menu-span").style.display = "none";
    } else {
        // mobile mode
        document.querySelector(".main-title").classList.add("mobile");
        document.querySelector("#open-menu-span").style.display = "block";
        document.querySelector("#close-menu-span").style.display = "none";
    }
}

// décalage de la zone principale sous la navbar
function navHeight() {
    let nav = document.querySelector("nav");
    let main = document.querySelector("main");
    main.style.marginTop = parseFloat(nav.offsetHeight) + "px";
    main.style.paddingBottom = parseFloat(nav.offsetHeight) + "px";
}

navMode();
navHeight();
updateOverlay();

window.onresize = function () {
    navMode();
    navHeight();
    updateOverlay();
};
