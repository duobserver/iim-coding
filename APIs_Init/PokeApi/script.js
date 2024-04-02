// collecting data of specific pokemon from API
function fetchPokemon(pokemon) {
    return fetch("https://pokeapi.co/api/v2/pokemon/" + pokemon).then((response) => response.json());
}

// requesting data of random pokemon and showing its name and sprite
async function displayPokemon() {
    let rand = Math.floor(Math.random() * 1000);
    console.log(rand);
    const data = await fetchPokemon(rand);

    document.querySelector("#current").innerHTML = `Current pokemon: ${data.name}`;
    document.querySelector("#pokemon").setAttribute("src", `${data.sprites.front_default}`);
    document.querySelector("#pokemon").setAttribute("alt", `${data.name}`);
}

// showing a first pokemon when the page is loaded
displayPokemon();
