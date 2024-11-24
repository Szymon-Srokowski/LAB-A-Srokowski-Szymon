const weatherButton = document.getElementById('weatherButton');
const cityInput = document.getElementById('cityInput');
const weatherResult = document.getElementById('weatherResult');
const forecastResult = document.getElementById('forecastResult');

//klucz API OpenWeatherMap
const API_KEY = '41a9e9c4ac68c85fa7dda762e880fd5d';

weatherButton.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city === '') {
        alert('Proszę wprowadzić nazwę miejscowości.');
        return;
    }

    getCurrentWeather(city);
    getForecast(city);
});

//XMLHttpRequest
function getCurrentWeather(city) {
    const xhr = new XMLHttpRequest();
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pl&appid=${API_KEY}`;

    xhr.open('GET', url, true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            console.log(data); 
            displayCurrentWeather(data);
        } else {
            weatherResult.innerHTML = `<p>Nie udało się pobrać danych o bieżącej pogodzie.</p>`;
        }
    };
    xhr.send();
}


function displayCurrentWeather(data) {
    const { name, weather, main } = data;
    const iconCode = weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    weatherResult.innerHTML = `
        <h2>Bieżąca pogoda dla: ${name}</h2>
        <img src="${iconUrl}" alt="${weather[0].description}">
        <p>${weather[0].description}</p>
        <p>Temperatura: ${main.temp}°C</p>
        <p>Wilgotność: ${main.humidity}%</p>
    `;
}

// Fetch API
function getForecast(city) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=pl&appid=${API_KEY}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Nie udało się pobrać prognozy.');
            }
            return response.json();
        })
        .then(data => {
            console.log(data); 
            displayForecast(data);
        })
        .catch(error => {
            console.error('Błąd:', error); 
            forecastResult.innerHTML = `<p>${error.message}</p>`;
        });
}


function displayForecast(data) {
    const { city, list } = data;
    let forecastHTML = `<h2>Prognoza 5-dniowa dla: ${city.name}</h2>`;

    list.forEach((entry, index) => {
        if (index % 8 === 0) { // wyświetlam prognozę co 24 godziny (dane są co 3 godziny)
            const iconCode = entry.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
            forecastHTML += `
                <div>
                    <p><strong>${new Date(entry.dt * 1000).toLocaleDateString('pl-PL')}</strong></p>
                    <img src="${iconUrl}" alt="${entry.weather[0].description}">
                    <p>${entry.weather[0].description}</p>
                    <p>Temperatura: ${entry.main.temp}°C</p>
                </div>
                <hr>
            `;
        }
    });

    forecastResult.innerHTML = forecastHTML;
}
