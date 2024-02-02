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

// contrôle de la visibilité du menu burger
let burger = document.querySelector(".programmes");

burger.addEventListener("click", function () {
  burger.classList.toggle("open");
});

// contrôle des pages des axes
let tabs = document.querySelectorAll(".tab");
let contents = document.querySelectorAll(".content");

tabs.forEach(function (item) {
  item.addEventListener("click", function () {
    
  });
});
