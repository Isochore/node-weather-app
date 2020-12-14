const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const errorMsg = document.querySelector('#error-msg');
const forecastMsg = document.querySelector('#forecast-msg');
const temperatureMsg = document.querySelector('#temperature-msg');
const cityMsg = document.querySelector('#city-msg');
const flagImg = document.querySelector('#flag-img');


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const location = search.value;
    
    errorMsg.textContent = 'Loading...'
    forecastMsg.innerHTML = '';
    temperatureMsg.innerHTML = '';
    cityMsg.innerHTML = '';
    flagImg.src = '';

    fetch(`/weather?address=${location}`, {
    method: 'GET',
    })
    .then(res => res.json())
    .then(({ error, forecast, temperature, location, city, short_code }) => {
        if (error) {
            return errorMsg.textContent = error;
        }
        errorMsg.textContent = '';
        forecastMsg.innerHTML = forecast;
        temperatureMsg.innerHTML = `${temperature}°C`;
        cityMsg.innerHTML = city;
        flagImg.src = 'https://wwgit sdtatuw.countryflags.io/' + short_code.toUpperCase() + '/flat/64.png';
        // flagImg.src = 'https://www.countryflags.io/fr/flat/64.png';
    }).catch(function(error) {
        console.log(error.message);
    });

})