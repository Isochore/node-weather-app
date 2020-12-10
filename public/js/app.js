const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const errorMsg = document.querySelector('#error-msg');
const resultMsg = document.querySelector('#result-msg');


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const location = search.value;
    
    errorMsg.textContent = 'Loading...'
    resultMsg.innerHTML = '';

    fetch(`http://localhost:2000/weather?address=${location}`, {
    method: 'GET',
    })
    .then(res => res.json())
    .then(response => {
        if (response.error) {
            return errorMsg.textContent = response.error;
        }
        errorMsg.textContent = '';
        resultMsg.innerHTML = response.location + '</br>' + response.forecast;
    }).catch(function(error) {
        console.log(error.message);
    });

})