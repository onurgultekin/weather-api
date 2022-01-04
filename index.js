const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const cities = [
  { name: 'Istanbul', country: 'Turkey' },
  { name: 'New York', country: 'USA' },
  { name: 'London', country: 'England' }
];
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/api/cities', function (request, response) {
  response.send(cities);
});

app.get('/api/weather/:name', function (request, response) {
  const cityName = request.params.name;
  let found = false;
  cities.forEach(city => {
    if (city.name == cityName) {
      found = true;
      const resp = {
        city: city,
        weather: randomIntFromInterval(-30, 50)
      }
      response.json(resp);
    }
  });
  if (!found) {
    response.json({ error: "City not found" });
  }
});

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

app.listen(5000, function () {
  console.log("App is running on port 5000");
});