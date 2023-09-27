document.getElementById('searchButton').addEventListener('click', searchMovies);

let apiKey = '81e9b9f8ab49681ab7a04b25eb32ea1e';
let urlBase = 'https://api.themoviedb.org/3/search/movie';
let urlImg = 'https://image.tmdb.org/t/p/w200';

let resultContainer = document.getElementById('results');

function searchMovies() {
    resultContainer.innerHTML = 'Cargando . . .';
    let searchInput = document.getElementById('searchInput').value;
    fetch(`${urlBase}?api_key=${apiKey}&query=${searchInput}`)
    .then(response => response.json())
    .then(response => displayMovies(response.results));
}

function displayMovies(movies) {
    resultContainer.innerHTML = '';

  if (movies.length === 0) {
    resultContainer.innerHTML = '<p>No se encontraron resultados para tu búsqueda</p>';
    return;
  }

  movies.forEach(movie => {
    let movieDiv = document.createElement('div');
    movieDiv.classList.add('movie');

    const title = document.createElement('h2');
    title.textContent = movie.title;

    let releaseDate = document.createElement('p');
    releaseDate.textContent = 'La fecha de lanzamiento fue: ' + movie.release_date;

    let overview = document.createElement('p');
    overview.textContent = movie.overview;

    let posterPath = urlImg + movie.poster_path;
    let poster = document.createElement('img');
    poster.src = posterPath;

    movieDiv.appendChild(poster);
    movieDiv.appendChild(title);
    movieDiv.appendChild(releaseDate);
    movieDiv.appendChild(overview);

    resultContainer.appendChild(movieDiv);
  });
}