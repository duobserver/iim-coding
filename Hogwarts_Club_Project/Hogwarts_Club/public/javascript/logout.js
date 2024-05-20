function logout() {
    try {
        localStorage.removeItem("token");
        localStorage.setItem("notification", "Successfully logged out");
        window.location.href = "/login";
    } catch (error) {
        localStorage.setItem("notification", `Failed to logout: ${error}`);
        notification();
    }
}
