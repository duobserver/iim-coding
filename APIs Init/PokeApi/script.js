// fetch("https://pokeapi.co/api/v2/pokemon/1002")
//   .then((response) => response.json())
//   .then((data) => {
//     console.log(data);
//   });

// collecting data of specific pokemon from API
function fetchPokemon(pokemon) {
  return fetch("https://pokeapi.co/api/v2/pokemon/" + pokemon).then((response) => response.json());
}

// requesting data of random pokemon and showing its name and sprite
async function displayPokemon() {
  let rand = Math.floor(Math.random() * 1000);
  console.log(rand);
  const data = await fetchPokemon(rand);
  document.querySelector("#pokemon").innerHTML = `
  <h1>${data.name}</h1>
  <img src="${data.sprites.front_default}" alt="${data.name}"/>
  `;
}

// shwoing a first pokemon when the page is loaded
displayPokemon();