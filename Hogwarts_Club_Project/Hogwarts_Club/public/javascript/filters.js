let houseFilters = document.querySelectorAll(".houseFilter");
let cards = document.querySelectorAll(".card");

console.log(houseFilters);

function filter() {
    let activeFilters = [];
    houseFilters.forEach((element) => {
        if (element.checked == true) {
            activeFilters.push(element.id);
        }
    });

    let cards = document.querySelectorAll(".card");
    console.log(cards);

    if (activeFilters.length == 0) {
        cards.forEach((element) => {
            element.style.display = "";
        });
    } else {
        cards.forEach((element) => {
            if (activeFilters.some((house) => element.classList.contains(house))) {
                element.style.display = "";
            } else {
                element.style.display = "none";
            }
        });
        console.log(activeFilters);
    }
}

houseFilters.forEach((element) => {
    element.addEventListener("change", function () {
        console.log("changed filters");
        filter();
    });
});
