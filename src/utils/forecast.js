const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {

    const url = `http://api.weatherstack.com/current?access_key=c29fe14b8085987f8d73892e82bddd26&query=${latitude},${longitude}`;

    // Call the api url with json output, classic (error, response) request
    request({ url, json: true }, (error, { body }) => {
        const { temperature, feelslike, weather_descriptions, observation_time } = body.current;
        const { dataError } = body;
        // If low error i.e connexion lost returns it
        if(error) {
            callback('Unable to connect to weather services', undefined);
        // If error i.e bad request returns it
        } else if (dataError) {
            callback('Unable to find results according to the location provided', undefined)
        // Returns data
        } else {
            callback(undefined, {
                temperature,
                feelslike,
                weather_descriptions,
                observation_time
            })
        }
    })
}

// Exports the function
module.exports = forecast