const peopleList = document.querySelector("#peopleList");

const fetchUsers = async () => {
    const response = await fetch("http://127.0.0.1:3000/people", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const result = await response.json();

    console.log(result);

    localStorage.removeItem("notice");
    noticeUpdate();

    result.forEach((user) => {
        let card = document.createElement("a");
        card.href = `user.html?id=${user.id}`;
        card.classList.add("user");
        card.innerHTML = `
        <span style="color:${user.color}" class="material-symbols-rounded">person</span>
        <span style="color:${user.color}">${user.name}</span>
        `;
        peopleList.appendChild(card);
    });
};

fetchUsers();
