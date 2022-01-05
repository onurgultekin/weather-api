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

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});

app.get('/api/cities', function (request, response) {
  // Return hard-coded cities array as json object
  response.send(cities);
});

app.get('/api/weather/:name', function (req, res) {
  // Get city name from URL
  const cityName = encodeURI(req.params.name);
  // Call open weather map api
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;
  request(url, function (err, response, body) {
    let weather = JSON.parse(body);
    weather.main.temp = Math.ceil(weather.main.temp);
    weather.main.feels_like = Math.ceil(weather.main.feels_like);
    weather.main.temp_min = Math.ceil(weather.main.temp_min);
    weather.main.temp_max = Math.ceil(weather.main.temp_max);
    res.json(weather);
  })
  // If city does not exist in open weather map api, it already returns 'not found',
  // so I decided not to handle if city exist in my hard-coded array list.
});

app.listen(`${process.env.PORT}`, function () {
  console.log("App is running on port " + `${process.env.PORT}`);
});

module.exports = app;