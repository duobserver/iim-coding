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

document.getElementById("sidebarButton").addEventListener("click", function () {
  console.log("clicked")
  document.getElementById("sidebar").classList.toggle("open");
});
