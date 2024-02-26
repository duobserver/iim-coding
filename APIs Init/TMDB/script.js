// collecting data of specific movie from API
function fetchMovie(movie) {
  return fetch(`https://api.themoviedb.org/3/movie/${movie}?api_key=&language=fr-FR`).then((response) => response.json());
}

// requesting data of random movie and showing its name and poster
async function displayMovie() {
  let rand = Math.floor(Math.random() * 1000);
  console.log(rand);
  const data = await fetchMovie(rand);
  document.querySelector("#movie").innerHTML = `
  <h1>${data.title}</h1>
  <img src="https://image.tmdb.org/t/p/w500${data.poster_path}" alt="${data.title}"/>
  `;
}

// shwoing a first pokemon when the page is loaded
displayMovie();
