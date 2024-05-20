function favorite() {
    const favoriteLinks = document.querySelectorAll(".cardFavorite");
    console.log(favoriteLinks);
    favoriteLinks.forEach((link) => {
        link.addEventListener("click", async (event) => {
            event.preventDefault();
            const token = localStorage.getItem("token");

            if (!token) {
                localStorage.setItem("notification", `Token not found. Please login to access your profile page`);
                window.location.href = "login";
            }

            const res = await fetch(`http://192.168.1.147:3000/api/favorite/${link.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const response = res.json();

            if (res.status === 200) {
                link.classList.toggle("Favorite");
            } else {
                localStorage.setItem("notification", response.message);
            }
        });
    });
}
