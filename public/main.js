console.log('main.js online');

const submitButton = document.querySelector('#search-button');
const movieSearch = document.querySelector('#movie-search');
const data = [];

const handleSubmit = (e) => {
  e.preventDefault();
  const query = movieSearch.value;
  const baseUrl = 'http://www.omdbapi.com';
  const apiKey = 'c9d5cf65';
  const init = {
    method: 'GET',
    mode: 'cors',
    cache: 'default',
  };
  fetch(`${baseUrl}/?s=${query}&page=1&apikey=${apiKey}`, init)
    .then(res => res.json())
    .then(json => console.log(json));
};

submitButton.addEventListener('click', handleSubmit);
