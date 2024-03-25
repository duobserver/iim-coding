window.onload = header();

function header() {
    let queryString = window.location.search;
    console.log(queryString);
    let urlParams = new URLSearchParams(queryString);

    let read = document.querySelector(`.${urlParams.get("read")}`);
    console.log(read);

    read.style.borderBottom = "2px solid cyan";
}
