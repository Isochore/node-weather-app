const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express()
const port = process.env.PORT || 2000;

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup hbs engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: '',
        name: 'Weatherstack.'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Weatherstack.'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    } 
    geocode(req.query.address, (error, { latitude, longitude, location, city, short_code } = {}) => {
        if (error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, { temperature, feelslike, weather_descriptions, observation_time } = {}) => {
            if (error) {
                return res.send({error})
            } 
            res.send({
                forecast: weather_descriptions,
                temperature,
                location,
                city,
                short_code,
                address: req.query.address,
                observation_time
            })
        })
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        message: 'I hope this helped you.',
        name: 'Weatherstack.'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error',
        error: 'Help article not found',
        name: 'Weatherstack.'

    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error',
        error: 'Page not found',
        name: 'Weatherstack.'
    })
})

app.listen(port, () => { 
    console.log('Server is up on port ' + port);
})