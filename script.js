const API_KEY = '9b9614f520009c0233801aef7f6cde78';
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const NEWS_API_URL = 'https://newsapi.org/v2/everything';
const NEWS_API_KEY = 'YOUR_NEWS_API_KEY'; // Replace with your actual News API key

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
const weatherVideo = document.getElementById('weather-video');
const currentWeatherVideo = document.getElementById('current-weather-video');
const weatherNews = document.getElementById('weather-news');
const newsList = document.getElementById('news-list');

searchBtn.addEventListener('click', searchWeather);
cityInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        searchWeather();
    }
});

async function searchWeather() {
    const city = cityInput.value.trim();
    if (city) {
        showLoading();
        try {
            const weatherData = await fetchWeather(city);
            displayWeather(weatherData);
            const newsData = await fetchNews(city);
            displayNews(newsData);
            hideLoading();
        } catch (error) {
            hideLoading();
            showError('Unable to fetch weather data. Please try again.');
            console.error('Error:', error);
        }
    }
}

async function fetchWeather(city) {
    try {
        const response = await axios.get(WEATHER_API_URL, {
            params: {
                q: city,
                appid: API_KEY,
                units: 'metric'
            }
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            throw new Error('City not found');
        }
        throw error;
    }
}

async function fetchNews(city) {
    try {
        const response = await axios.get(NEWS_API_URL, {
            params: {
                q: `${city} weather`,
                apiKey: NEWS_API_KEY,
                language: 'en',
                pageSize: 5
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching news:', error);
        return { articles: [] };
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
    errorMessage.style.display = 'none';

    displayWeatherVideo(data.weather[0].main);
}

function displayWeatherVideo(weatherCondition) {
    const videoUrl = getWeatherVideoUrl(weatherCondition);
    currentWeatherVideo.src = videoUrl;
    weatherVideo.style.display = 'block';
}

function getWeatherVideoUrl(weatherCondition) {
    const videos = {
        Clear: 'https://example.com/clear-weather.mp4',
        Clouds: 'https://example.com/cloudy-weather.mp4',
        Rain: 'https://example.com/rainy-weather.mp4',
        Snow: 'https://example.com/snowy-weather.mp4'
    };
    return videos[weatherCondition] || videos.Clear;
}

function displayNews(newsData) {
    newsList.innerHTML = '';
    newsData.articles.forEach(article => {
        const li = document.createElement('li');
        li.textContent = article.title;
        newsList.appendChild(li);
    });
    weatherNews.style.display = 'block';
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    weatherContainer.style.display = 'none';
    weatherVideo.style.display = 'none';
    weatherNews.style.display = 'none';
}

function showLoading() {
    loading.style.display = 'flex';
    weatherContainer.style.display = 'none';
    errorMessage.style.display = 'none';
    weatherVideo.style.display = 'none';
    weatherNews.style.display = 'none';
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

window.addEventListener('load', loadLastCity);

