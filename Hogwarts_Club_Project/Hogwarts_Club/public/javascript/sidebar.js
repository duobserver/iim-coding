function sidebarResize() {
    let sidebar = document.querySelector("#sidebar");
    let sidebarButton = document.querySelector("#sidebarButton");

    let style = getComputedStyle(sidebar);

    document.documentElement.style.setProperty("--sidebar-width", `${parseFloat(getComputedStyle(sidebar).width)}px`);
    document.documentElement.style.setProperty("--sidebar-button-height", `${sidebarButton.offsetHeight}px`);
}

window.addEventListener("load", () => {
    sidebarResize();
    let showSidebar = document.querySelector("#showSidebar");
    if (window.innerWidth > 960) {
        showSidebar.checked = true;
    } else {
        showSidebar.checked = false;
    }
});

window.addEventListener("resize", () => {
    sidebarResize();
});
