function topOffest() {
    console.log(document.querySelector("#profileHeader").offsetHeight);
    let header = document.querySelector("#ribbonHeader");
    header.style.top = document.querySelector("#profileHeader").offsetHeight + "px";
}

topOffest();
