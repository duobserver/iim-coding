function logout() {
    try {
        localStorage.removeItem("token");
        localStorage.setItem("notification", "Successfully logged out");
        notification();
    } catch (error) {
        localStorage.setItem("notification", `Failed to logout: ${error}`);
        notification();
    }
}
