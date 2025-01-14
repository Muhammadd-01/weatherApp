const WEATHER_API_KEY = '84011d9586dfbb5c34013f640d2f1fe6';
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const NEWS_API_KEY = '0e14868067ed468f96700b1f45ca7193'; // Replace with your actual News API key
const NEWS_API_URL = 'https://newsapi.org/v2/everything';

const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherContainer = document.getElementById('weather-container');
const newsContainer = document.getElementById('news-container');
const cityName = document.getElementById('city-name');
const weatherIcon = document.getElementById('weather-icon');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const feelsLike = document.getElementById('feels-like');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const errorMessage = document.getElementById('error-message');
const newsList = document.getElementById('news-list');
const feedbackForm = document.getElementById('feedback-form');

searchBtn.addEventListener('click', searchWeatherAndNews);
cityInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        searchWeatherAndNews();
    }
});

async function searchWeatherAndNews() {
    const city = cityInput.value.trim();
    if (city) {
        try {
            const weatherData = await fetchWeather(city);
            displayWeather(weatherData);
            const newsData = await fetchNews(city);
            displayNews(newsData);
        } catch (error) {
            showError('Unable to fetch data. Please try again.');
            console.error('Error:', error);
        }
    }
}

async function fetchWeather(city) {
    const response = await fetch(`${WEATHER_API_URL}?q=${city}&appid=${WEATHER_API_KEY}&units=metric`);
    if (!response.ok) {
        throw new Error('City not found');
    }
    return response.json();
}

async function fetchNews(city) {
    const response = await fetch(`${NEWS_API_URL}?q=${city} weather&apiKey=${NEWS_API_KEY}&language=en&pageSize=5`);
    if (!response.ok) {
        throw new Error('Unable to fetch news');
    }
    return response.json();
}

function displayWeather(data) {
    cityName.textContent = data.name;
    weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherIcon.alt = data.weather[0].description;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    description.textContent = data.weather[0].description;
    feelsLike.textContent = `Feels like: ${Math.round(data.main.feels_like)}°C`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    windSpeed.textContent = `Wind speed: ${data.wind.speed} m/s`;

    weatherContainer.classList.remove('hidden');
    errorMessage.classList.add('hidden');
}

function displayNews(data) {
    newsList.innerHTML = '';
    data.articles.forEach(article => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = article.url;
        a.target = '_blank';
        a.textContent = article.title;
        li.appendChild(a);
        newsList.appendChild(li);
    });
    newsContainer.classList.remove('hidden');
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
    weatherContainer.classList.add('hidden');
    newsContainer.classList.add('hidden');
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Feedback form submission
feedbackForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Here you would typically send the feedback data to a server
    console.log('Feedback submitted:', { name, email, message });

    // Show a success message (you can replace this with a more sophisticated notification)
    alert('Thank you for your feedback!');
    feedbackForm.reset();
});

// Add some animations when the page loads
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});