/* eslint-env browser */
const submitButton = document.querySelector('#search-button');
const movieSearch = document.querySelector('#movie-search');
const movieList = document.querySelector('.movieList');
const favesButton = document.querySelector('.faves');

const baseUrl = 'http://www.omdbapi.com';
const apiKey = 'c9d5cf65';
// let data = [];

const getSingleMovie = (id) => {
  const query = id;
  const movie = fetch(`${baseUrl}/?i=${query}&apikey=${apiKey}`)
    .then(res => res.json());
  return movie;
};

const showSingleMovie = (e) => {
  movieList.innerHTML = '';
  getSingleMovie(e.target.dataset.id)
    .then((movie) => {
      const movieTitle = document.createElement('h2');
      movieTitle.textContent = movie.Title;
      movieList.appendChild(movieTitle);

      const moviePoster = document.createElement('img');
      moviePoster.setAttribute('src', movie.Poster);
      movieList.appendChild(moviePoster);

      const moviePlot = document.createElement('p');
      moviePlot.textContent = movie.Plot;
      movieList.appendChild(moviePlot);

      const faveButton = document.createElement('button');
      faveButton.textContent = 'Fave';
      faveButton.addEventListener('click', () => {
        const init = {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(movie),
        };
        fetch('/favorites', init)
          .then(res => res.json());
      });
      movieList.appendChild(faveButton);
    });
};

const showMovies = (moviesPromise) => {
  movieList.innerHTML = '';
  moviesPromise.then((movies) => {
    movies.Search.forEach((movie) => {
      const movieP = document.createElement('p');
      movieP.textContent = movie.Title;
      movieP.dataset.id = movie.imdbID;
      movieP.addEventListener('click', showSingleMovie);
      movieList.appendChild(movieP);
    });
  });
};

const showFaves = (moviesPromise) => {
  movieList.innerHTML = '';
  moviesPromise.then((movies) => {
    movies.forEach((movie) => {
      const movieP = document.createElement('p');
      movieP.textContent = movie.Title;
      movieP.dataset.id = movie.imdbID;
      movieP.addEventListener('click', showSingleMovie);
      movieList.appendChild(movieP);
    });
  });
};

const getFaves = () => {
  const data = fetch('/favorites')
    .then(res => res.json());
  showFaves(data);
};

const getAllMovies = () => {
  const query = movieSearch.value;
  const data = fetch(`${baseUrl}/?s=${query}&page=1&apikey=${apiKey}`)
    .then(res => res.json());
  showMovies(data);
};

submitButton.addEventListener('click', getAllMovies);
favesButton.addEventListener('click', getFaves);
