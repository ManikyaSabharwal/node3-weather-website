const request = require("request");

const forecast = ({latitude, longitude}, callback) => {
    console.log(latitude, longitude);
    const url = 'https://api.darksky.net/forecast/512041ddde71d3f8cf23f3f3f8021b6a/' + latitude + ',' + longitude + '?units=si' ;
    request({url, json: true}, (error, { body }) => {
        if(error) {
            callback('Unable to connect to weather service!', undefined);
        } else if(body.error) {
            callback('Unable to find location.', undefined);
        } else {
            callback(undefined, `${ body.hourly.summary } ${ body.daily.summary } It is currently ${ body.currently.temperature} outside. Chances of rain are: ${body.currently.precipProbability * 100} %`);
        }
    })
};

module.exports = forecast;