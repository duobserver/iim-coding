function notification() {
    const notification = localStorage.getItem("notification");

    if (notification) {
        alert(notification);
        localStorage.removeItem("notification");
    }
}

notification();
