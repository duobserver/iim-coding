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
  console.log("clicked");
  document.getElementById("sidebar").classList.toggle("open");
});

let axes = document.querySelectorAll(".tab");
let contents = document.querySelectorAll(".content");

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
    if (this.classList.contains("tab-3d")) {
      document.getElementById("3d").classList.add("active");
    }
    if (this.classList.contains("tab-cd")) {
      document.getElementById("cd").classList.add("active");
    }
  });
});
