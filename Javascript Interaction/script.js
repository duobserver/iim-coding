const swiper = new Swiper(".swiper", {
    // Optional parameters
    direction: "horizontal",
    loop: true,
    centeredSlides: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
});

// contrôle hauteur et visibilité du menu burger
let header = document.querySelector("header");
let burger = document.querySelector(".programmes");
let title = document.querySelector(".title");
let main = document.querySelector("main");

window.onload = function () {
    navHeight();
};

window.onresize = function () {
    navHeight();
};

function navHeight() {
    if (window.innerWidth < 960) {
        contents.forEach(function (item) {
            item.style.paddingTop = parseFloat(title.offsetHeight) + "px";
        });

        let headerHeight = header.offsetHeight;
        console.log(headerHeight);
        burger.style.height =
            parseFloat(window.innerHeight - headerHeight) + "px";
    } else {
        contents.forEach(function (item) {
            item.style.paddingTop = "";
        });

        burger.style.height = "";
    }
}

title.addEventListener("click", function () {
    burger.classList.toggle("open");
});

// contrôle des pages des programmes
let tabs = document.querySelectorAll(".tab");
let contents = document.querySelectorAll(".content");

tabs.forEach(function (item) {
    item.addEventListener("click", function () {
        tabs.forEach(function (item) {
            item.classList.remove("tab-active");
        });
        contents.forEach(function (item) {
            item.classList.remove("active");
        });

        this.classList.add("tab-active");

        if (this.classList.contains("tab-cdi")) {
            document.querySelector(".cdi").classList.add("active");
        }

        if (this.classList.contains("tab-an")) {
            document.querySelector(".an").classList.add("active");
        }

        if (this.classList.contains("tab-jv")) {
            document.querySelector(".jv").classList.add("active");
        }

        if (this.classList.contains("tab-cd")) {
            document.querySelector(".cd").classList.add("active");
        }

        if (this.classList.contains("tab-cdeb")) {
            document.querySelector(".cdeb").classList.add("active");
        }

        burger.classList.remove("open");
    });
});
