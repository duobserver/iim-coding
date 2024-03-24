let showSidebarButton = document.querySelector("#showSidebarButton");
let nav = document.querySelector("nav");
let main = document.querySelector("main");

window.onload = showSidebar();
window.onresize = showSidebar();

showSidebarButton.addEventListener("click", function () {
    nav.classList.toggle("showSidebar");
    showSidebar();
});

function showSidebar() {
    if (nav.classList.contains("showSidebar")) {
        showSidebarButton.value = "hide sidebar";
    } else {
        showSidebarButton.value = "show sidebar";
    }
}
