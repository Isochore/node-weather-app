const request = require('postman-request');

const geocode = (address, callback) => {

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiamVhbmplYW45MCIsImEiOiJja2k0bWl3MGkxbHE5MnFtc3lud3NmeGJtIn0.YVu15kys33nkJqpVlktNbw&limit=1`;

    // Call the api url with json output, classic (error, response) request
    request({ url, json: true }, (error,{ body }) => {
        const { center, place_name: location } = body.features[0] || {};
        // If low error i.e connexion lost returns it
        if (error) {
            callback('Unable to connect to geocode services', undefined)
        // If error i.e bad request returns it
        } else if (body.features.length === 0) {
            callback('Unable to find results according to the location provided', undefined)
        // Returns the data
        } else {
            callback(undefined, {
                latitude: center[1],
                longitude: center[0],
                location
            })
        }
    })
}

// Exports the function
module.exports = geocode 