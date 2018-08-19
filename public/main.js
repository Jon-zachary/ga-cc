/* eslint-env browser */

console.log('main.js online');

const submitButton = document.querySelector('#search-button');
const movieSearch = document.querySelector('#movie-search');
const movieList = document.querySelector('.movieList');
const baseUrl = 'http://www.omdbapi.com';
const apiKey = 'c9d5cf65';
let data = [];

const getSingleMovie = (id) => {
  movieList.innerHTML = '';
  const query = id;
  const movie = fetch(`${baseUrl}/?i=${query}&apikey=${apiKey}`)
    .then(res => res.json());
  return movie;
};

const showSingleMovie = (e) => {
  getSingleMovie(e.target.dataset.id)
    .then((movie) => {
      console.log(movie);
    });
};

const showMovies = (moviesPromise) => {
  moviesPromise.then((movies) => {
    movies.Search.forEach((movie) => {
      const movieP = document.createElement('p');
      movieP.textContent = movie.Title;
      movieP.dataset.id = movie.imdbID;
      movieP.addEventListener('click', showSingleMovie);
      movieList.appendChild(movieP);
      console.log(movie);
    });
  });
};

const getAllMovies = (e) => {
  e.preventDefault();
  const query = movieSearch.value;
  data = fetch(`${baseUrl}/?s=${query}&page=1&apikey=${apiKey}`)
    .then(res => res.json());
  showMovies(data);
};

submitButton.addEventListener('click', getAllMovies);
