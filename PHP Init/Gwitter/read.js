window.onload = header();

function header() {
    let urlParams = new URLSearchParams(window.location.search);

    let read = document.querySelector(`.${urlParams.get("read")}`);

    if (urlParams.get("read") == "followingu") {
        read = document.querySelector(`.following`);
    }

    read.style.borderBottom = "2px solid cyan";
}
