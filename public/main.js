/* eslint-env browser */

// DOM elements
const submitButton = document.querySelector('#search-button');
const movieSearch = document.querySelector('#movie-search');
const movieList = document.querySelector('.movieList');
const favesButton = document.querySelector('.faves');

// API Variables
const baseUrl = 'http://www.omdbapi.com';
const apiKey = 'c9d5cf65';

// Fetches a single movie from the omdb api given it's id.
// Takes an id and returns a promise.
const getSingleMovie = (id) => {
  const query = id;
  const movie = fetch(`${baseUrl}/?i=${query}&apikey=${apiKey}`)
    .then(res => res.json());
  return movie;
};

// Calls getSingleMovie and shows the Title, poster and plot.
// Takes an event and manipulates the DOM, returns null.
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

      const backButton = document.createElement('button');
      backButton.textContent = 'Back';
      backButton.addEventListener('click', getAllMovies);
      movieList.appendChild(backButton);
    });
};

// Shows the titles of movies returned from a given search.
// Takes a promise and manipulates the DOM, adds event listeners, return null.
// Should refactor to single event listener on parent container.
const showAllMovies = (moviesPromise) => {
  movieList.innerHTML = '';
  const allMoviesHeader = document.createElement('h3');
  allMoviesHeader.textContent = 'Click movie title for details';
  movieList.appendChild(allMoviesHeader);
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

// Shows movies that have been favorited. Like ShowAll but our api returns different shaped data
// Takes a promise, manipulates DOM and returns null
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

// Gets favorite movies from our API /favorite endpoint
// Takes no args, returns a promise
const getFaves = () => {
  const data = fetch('/favorites')
    .then(res => res.json());
  showFaves(data);
};

// Gets all movies for a given search from omdb api.
// Takes no args returns a promise
const getAllMovies = () => {
  const query = movieSearch.value;
  const data = fetch(`${baseUrl}/?s=${query}&page=1&apikey=${apiKey}`)
    .then(res => res.json());
  showAllMovies(data);
};

// Adds event listeners to the getAll movies and getFaves buttons.
submitButton.addEventListener('click', getAllMovies);
favesButton.addEventListener('click', getFaves);
