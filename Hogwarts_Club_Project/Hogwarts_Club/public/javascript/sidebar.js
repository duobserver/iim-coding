function sidebarResize() {
    let sidebar = document.querySelector("#sidebar");
    let sidebarButton = document.querySelector("#sidebarButton");

    let style = getComputedStyle(sidebar);

    console.log(sidebar.offsetWidth);

    console.log(style.width);

    document.documentElement.style.setProperty("--sidebar-width", `${parseFloat(getComputedStyle(sidebar).width)}px`);
    document.documentElement.style.setProperty("--sidebar-button-height", `${sidebarButton.offsetHeight}px`);
}

window.addEventListener("load", () => {
    sidebarResize();
});

window.addEventListener("resize", () => {
    sidebarResize();
});
