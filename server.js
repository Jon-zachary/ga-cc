const express = require('express');

const app = express();
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/favorites', (req, res) => {
  const data = fs.readFileSync('./data.json');
  res.setHeader('Content-Type', 'application/json');
  res.send(data);
});

app.post('/favorites', (req, res) => {
  if (!req.body.Title || !req.body.imdbID) {
    res.send('Error');
  }

  const data = JSON.parse(fs.readFileSync('./data.json'));
  data.push(req.body);
  fs.writeFile('./data.json', JSON.stringify(data));
  res.setHeader('Content-Type', 'application/json');
  res.send(data);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
