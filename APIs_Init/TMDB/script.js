// collecting data of specific movie from API
function fetchMovie(movie) {
    return fetch(`https://api.themoviedb.org/3/movie/${movie}?api_key=`).then((response) => response.json());
}

// requesting data of random movie and showing its name and poster
async function displayMovie() {
    let rand = Math.floor(Math.random() * 100);
    console.log(rand);
    const data = await fetchMovie(rand);

    document.querySelector("#current").innerHTML = `Current movie: ${data.title}`;
    document.querySelector("#poster").setAttribute("src", `https://image.tmdb.org/t/p/w500${data.poster_path}`);
    document.querySelector("#poster").setAttribute("alt", `${data.title}`);
}

// showing a first movie when the page is loaded
displayMovie();
