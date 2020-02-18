const request = require('request')

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) 
                + '.json?access_token=pk.eyJ1IjoibWFuaWt5YXNhYmhhcndhbCIsImEiOiJjazZxMDM5OHQwdjhjM2VwOWZjeXRmZTJ0In0.I8JZUHFoP2f-UirBRKbDrQ&limit=1'
    
    request({url, json: true}, (error, { body }) => {
        if(error) {
            callback('Unable to connect to geoCoding service!', undefined);
        } else if(body.features.length === 0) {
            callback('Wrong location entered.')
        } else {
            const coordinates = body.features[0].center;
            callback(undefined, {
                location: body.features[0].place_name,
                longitude: coordinates[0],
                latitude: coordinates[1]
            })
        }
    }) 
}

module.exports = geoCode;