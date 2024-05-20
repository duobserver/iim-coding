// fetch all characters from hp-api
async function fetchCharacters() {
    // if (localStorage.getItem("characters")) {
        
    // } else {
        
    // }

    return fetch("https://hp-api.lainocs.fr/characters")
        .then((res) => res.json())
        .catch((error) => console.error("Error: ", error));
}
