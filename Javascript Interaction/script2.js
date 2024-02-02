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
let main = document.querySelector("main");
let burger = document.querySelector(".programmes");
let title = document.querySelector(".title")

window.onload = function () {
    let h = main.offsetHeight;
    console.log(h)
    burger.style.height = parseFloat(h) + "px";
};

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
    });
});
