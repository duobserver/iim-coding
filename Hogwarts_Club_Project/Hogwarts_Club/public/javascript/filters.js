let houseFilters = document.querySelectorAll(".houseFilter");

function filter() {
    let activeFilters = [];
    houseFilters.forEach((element) => {
        if (element.checked == true) {
            activeFilters.push(element.id);
        }
    });

    let cards = document.querySelectorAll(".card");

    if (activeFilters.length == 0) {
        cards.forEach((element) => {
            element.style.display = "";
        });
    } else {
        cards.forEach((element) => {
            let faved = element.querySelector(".cardFavorite")
            if (activeFilters.some((house) => element.classList.contains(house)) || activeFilters.some((house) => faved.classList.contains(house))) {
                element.style.display = "";
            } else {
                element.style.display = "none";
            }
        });
    }
}

houseFilters.forEach((element) => {
    element.addEventListener("change", function () {
        console.log("changed filters");
        filter();
    });
});
