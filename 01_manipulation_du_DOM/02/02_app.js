let accordeons = document.querySelectorAll(".accordeon");

accordeons.forEach(function (item) {
  item.addEventListener("click", function () {
    this.classList.toggle("open");
  });
});
