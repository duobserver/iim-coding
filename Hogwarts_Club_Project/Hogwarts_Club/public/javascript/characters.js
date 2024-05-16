// fetch all characters from hp-api
function fetchCharacters() {
    return fetch("https://hp-api.lainocs.fr/characters")
        .then((res) => res.json())
        .catch((error) => console.error("Error: ", error));
}
