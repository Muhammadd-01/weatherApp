const API_KEY = 'YOUR_API_KEY_HERE';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const cityName = document.getElementById('city-name');
const weatherIcon = document.getElementById('weather-icon');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const windSpeed = document.getElementById('wind-speed');
const humidity = document.getElementById('humidity');
const weatherContainer = document.getElementById('weather-container');
const errorMessage = document.getElementById('error-message');
const loading = document.getElementById('loading');

searchBtn.addEventListener('click', searchWeather);
cityInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        searchWeather();
    }
});

function searchWeather() {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    }
}

async function fetchWeather(city) {
    showLoading();
    try {
        const response = await axios.get(API_URL, {
            params: {
                q: city,
                appid: API_KEY,
                units: 'metric'
            }
        });
        hideLoading();
        displayWeather(response.data);
        saveLastCity(city);
    } catch (error) {
        hideLoading();
        showError('City not found. Please try again.');
    }
}

function displayWeather(data) {
    cityName.textContent = data.name;
    weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherIcon.alt = data.weather[0].description;
    temperature.textContent = `${Math.round(data.main.temp)}°C / ${Math.round(data.main.temp * 9/5 + 32)}°F`;
    description.textContent = data.weather[0].description;
    windSpeed.textContent = `Wind: ${data.wind.speed} m/s`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;

    weatherContainer.style.display = 'block';
    weatherContainer.classList.add('animate__fadeIn');
    errorMessage.style.display = 'none';
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    weatherContainer.style.display = 'none';
}

function showLoading() {
    loading.style.display = 'flex';
    weatherContainer.style.display = 'none';
    errorMessage.style.display = 'none';
}

function hideLoading() {
    loading.style.display = 'none';
}

function saveLastCity(city) {
    localStorage.setItem('lastCity', city);
}

function loadLastCity() {
    const lastCity = localStorage.getItem('lastCity');
    if (lastCity) {
        cityInput.value = lastCity;
        searchWeather();
    }
}

// Load last searched city on page load
window.addEventListener('load', loadLastCity);

