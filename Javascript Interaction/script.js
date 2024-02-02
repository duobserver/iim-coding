let axes = document.querySelectorAll(".tab");
let contents = document.querySelectorAll(".content");
let burger = document.querySelector("#programmes");

// Paramétrage du carousel Swiper
const swiper = new Swiper(".swiper", {
  spaceBetween: 0,
  centeredSlides: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },

  // Optional parameters
  direction: "horizontal",
  loop: true,
});

// Contrôle de la visibilité du menu burger
burger.addEventListener("click", function () {
  burger.classList.toggle("open");
});

axes.forEach(function (item) {
  item.addEventListener("click", function () {
    axes.forEach(function (item) {
      item.classList.remove("tab-active");
    });
    contents.forEach(function (item) {
      item.classList.remove("active");
    });
    this.classList.add("tab-active");

    if (this.classList.contains("tab-cdi")) {
      document.getElementById("cdi").classList.add("active");
    }

    if (this.classList.contains("tab-cdeb")) {
      document.getElementById("cdeb").classList.add("active");
    }

    if (this.classList.contains("tab-jv")) {
      document.getElementById("jv").classList.add("active");
    }

    if (this.classList.contains("tab-animation")) {
      document.getElementById("animation").classList.add("active");
    }

    if (this.classList.contains("tab-cd")) {
      document.getElementById("cd").classList.add("active");
    }
  });
});
