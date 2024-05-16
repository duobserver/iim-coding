let houseFilters = document.querySelectorAll(".houseFilter");

console.log(houseFilters);

function filter() {
    let activeFilters = [];
    houseFilters.forEach((element) => {
        if (element.checked == true) {
            activeFilters.push(element.id);
        }
    });
    console.log(activeFilters);
}

houseFilters.forEach((element) => {
    element.addEventListener("change", function () {
        console.log("changed filters");
        filter();
    });
});
