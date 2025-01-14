const API_KEY = '9b9614f520009c0233801aef7f6cde78';
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
const animeCharacter = document.getElementById('anime-character');
const happyMessage = document.getElementById('happy-message');
const feedbackForm = document.getElementById('feedback-form');

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

    displayAnimeCharacter(data.main.temp);
}

function displayAnimeCharacter(temp) {
    let message = '';
    let imageUrl = '';

    if (temp > 25) {
        message = "It's a beautiful sunny day!";
        imageUrl = 'https://example.com/sunny-anime-character.png';
    } else if (temp > 15) {
        message = "Perfect weather for a walk!";
        imageUrl = 'https://example.com/pleasant-anime-character.png';
    } else {
        message = "Don't forget your jacket!";
        imageUrl = 'https://example.com/cold-anime-character.png';
    }

    animeCharacter.querySelector('img').src = imageUrl;
    happyMessage.textContent = message;
    animeCharacter.style.display = 'block';
    animeCharacter.classList.add('animate__bounceIn');
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    weatherContainer.style.display = 'none';
    animeCharacter.style.display = 'none';
}

function showLoading() {
    loading.style.display = 'flex';
    weatherContainer.style.display = 'none';
    errorMessage.style.display = 'none';
    animeCharacter.style.display = 'none';
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

feedbackForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Here you would typically send this data to a server
    console.log('Feedback submitted:', { name, email, message });
    alert('Thank you for your feedback!');
    feedbackForm.reset();
});

// Load last searched city on page load
window.addEventListener('load', loadLastCity);

