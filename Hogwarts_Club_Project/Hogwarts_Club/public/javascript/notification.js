function notification() {
    const notification = localStorage.getItem("notification");

    if (notification) {
        alert(notification);
        localStorage.removeItem("notification");
    }
}

window.addEventListener("load", () => {
    setTimeout(() => {
        notification();
    }, 1000);
    
});
