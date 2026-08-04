const movieNameInput = document.getElementById('movieNameInput');
const searchBtn = document.getElementById('searchBtn');
const message = document.getElementById('message');
const movieContainer = document.getElementById('movieContainer');
const apiKey = "9576420d";
const apiURL = `http://www.omdbapi.com/?apikey=${apiKey}&`;

const popOver = document.createElement('div');
popOver.id = "pop";
popOver.setAttribute('popover', 'auto');
document.body.appendChild(popOver);
console.log(popOver);

searchBtn.addEventListener('click', searchMovie);

async function searchMovie() {
    const movieName = movieNameInput.value.trim();

    if (movieName === "") {
        message.textContent = "please select a movie";
        return;
    }

    console.log(movieName);

    const request = apiURL + `s=${encodeURIComponent(movieName)}`;
    console.log(request);

    const response = await fetch(request);
    const data = await response.json();

    if (data.Response === "False") {
        movieContainer.innerHTML = "";
        message.textContent = data.Error;
        return;
    }

    console.log(data);

    movieContainer.innerHTML = "";
    message.textContent = "";

    data.Search.forEach(movie => {

        const movieDiv = document.createElement('div');
        movieDiv.id = 'movieDiv';
        movieDiv.innerHTML = `
        <img src="${movie.Poster}">
        <p>Title: ${movie.Title}</p>
        <p>Year: ${movie.Year}</p>
        `

        const viewBtn = document.createElement('button');
        viewBtn.textContent = "View Details";

        movieDiv.appendChild(viewBtn);
        movieContainer.appendChild(movieDiv);


        viewBtn.addEventListener('click', () => details(movie.imdbID));
    });

}


async function details(id) {
    const movieId = id;
    console.log(movieId);

    const request = apiURL + `i=${encodeURIComponent(movieId)}`;
    const response = await fetch(request);
    const data = await response.json();

    console.log(data);

    popOver.innerHTML = `
        <p>Title: ${data.Title}</p>
        <p>Year: ${data.Year}</p>
        <p>Actors: ${data.Actors}</p>
        <p>Director: ${data.Director}</p>
        <p>Released: ${data.Released}</p>
        `;

    popOver.showPopover();
}


