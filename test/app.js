//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

chai.use(chaiHttp);

/*
* Test the /GET route
*/
describe('/GET cities', () => {
  it('it should GET all the cities and should not return empty array', (done) => {
    chai.request(server)
      .get('/api/cities')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.not.be.eql(0);
        res.body.length.should.be.eql(3);
        res.body[0].should.have.property('name');
        res.body[0].should.have.property('country');
        done();
      });
  });
});

describe('/GET weather info for London', () => {
  it('it should GET weather information about London', (done) => {
    const city = "London";
    chai.request(server)
      .get('/api/weather/' + city)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('coord');
        res.body.should.have.property('weather');
        res.body.should.have.property('main');
        res.body.should.have.property('visibility');
        res.body.should.have.property('wind');
        res.body.should.have.property('clouds');
        res.body.should.have.property('dt');
        res.body.should.have.property('sys');
        res.body.should.have.property('timezone');
        res.body.should.have.property('id');
        res.body.should.have.property('name');
        res.body.should.have.property('cod');
        res.body.name.should.be.equal(city);
        res.body.main.temp.should.be.a('number');
        done();
      });
  });
});

describe('/GET weather info for Gotham City', () => {
  it('it should not GET weather information about Gotham City', (done) => {
    const city = "Gotham City";
    chai.request(server)
      .get('/api/weather/' + city)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.not.have.property('weather');
        res.body.should.have.property('cod');
        res.body.should.have.property('message');
        res.body.cod.should.be.equal('404');
        res.body.message.should.be.equal("city not found");
        done();
      });
  });
});