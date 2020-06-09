const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=730250b2a49600917f3b5664aa3470df&query=' + latitude + ',' + longitude ;
        
  request({ url, json:true }, (error, { body }) => {
    if(error) {
      callback('Unable to connect to weather service!', undefined);
    }
    else if(body.error) {
      callback('Unable able to find location', undefined);
    }
    else {
      callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out. ' + 'And the humidity out here is ' + body.current.humidity + "% in air."); 
    }
  })         
}

module.exports = forecast;