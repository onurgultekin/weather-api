const request = require('request');
const express = require('express');
const bodyParser = require('body-parser');

const cities = [
  { name: 'Istanbul', country: 'Turkey' },
  { name: 'New York', country: 'USA' },
  { name: 'London', country: 'England' }
]; // Cities could be collected from a mongoDB collection but for being quick, I decided to handle it hard-coded.
const app = express();

// Dotend config
require('dotenv').config()

//Get API key from env file
const apiKey = `${process.env.API_KEY}`;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/api/cities', function (request, response) {
  // Return hard-coded cities array as json object
  response.send(cities);
});

app.get('/api/weather/:name', function (req, res) {
  // Get city name from URL
  const cityName = req.params.name;
  // Call open weather map api
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;
  request(url, function (err, response, body) {
    let weather = JSON.parse(body);
    res.json(weather);
  })
  // If city does not exist in open weather map api, it already returns 'not found',
  // so I decided not to handle if city exist in my hard-coded array list.
});

app.listen(5000, function () {
  console.log("App is running on port 5000");
});