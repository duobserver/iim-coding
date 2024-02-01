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

// Sélection des éléments HTML
let sidebar = 
let axes = document.querySelectorAll(".tab");
let contents = document.querySelectorAll(".content");
let main = document.querySelector("main");

// Contrôle de la visibilité du menu burger
document.getElementById("sidebarButton").addEventListener("click", function () {
  console.log("clicked");
  document.getElementById("sidebar").classList.toggle("open");
  document.getElementById("chevron").classList.toggle("rotate");

  computed = window.getComputedStyle(sidebar);
  width = computed.getPropertyValue("width");
  contents.forEach(function (item) {
    item.style.marginLeft = parseFloat(width) + "px";
  })
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
      main.style.backgroundImage =
        "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://www.iim.fr/ecole-web/wp-content/uploads/2022/09/Sans-titre574.jpg')";
    }
    if (this.classList.contains("tab-cdeb")) {
      document.getElementById("cdeb").classList.add("active");
      main.style.backgroundImage =
        "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://www.iim.fr/ecole-web/wp-content/uploads/2023/10/Github-copilot-2023-iim-developpement-web-coding.jpg')";
    }
    if (this.classList.contains("tab-jv")) {
      document.getElementById("jv").classList.add("active");
    }
    if (this.classList.contains("tab-3d")) {
      document.getElementById("3d").classList.add("active");
      main.style.backgroundImage =
        "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://www.iim.fr/ecole-web/wp-content/uploads/2023/01/Sans-titre951.jpg')";
    }
    if (this.classList.contains("tab-cd")) {
      document.getElementById("cd").classList.add("active");
    }
  });
});
