const request = require('request');
const express = require('express');
const bodyParser = require('body-parser');

const cities = [
  { name: 'Istanbul', country: 'Turkey' },
  { name: 'New York', country: 'USA' },
  { name: 'London', country: 'England' },
  { name: 'sadas', country: 'England' }
]; // Cities could be collected from a mongoDB collection.
const app = express();

// Dotend config
require('dotenv').config()

//Get API key from env file
const apiKey = `${process.env.API_KEY}`;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/api/cities', function (request, response) {
  response.send(cities);
});

app.get('/api/weather/:name', function (req, res) {
  const cityName = req.params.name;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;
  request(url, function (err, response, body) {
    console.log(err, response, body);
    let weather = JSON.parse(body);
    res.json(weather);
  })
});

app.listen(5000, function () {
  console.log("App is running on port 5000");
});