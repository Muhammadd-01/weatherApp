# Weather App

This is a simple weather app that allows users to search for weather information by city name. It displays current temperature, weather description, wind speed, and humidity.

## Features

- Search weather by city name
- Display current temperature in Celsius and Fahrenheit
- Show weather description and icon
- Display wind speed and humidity
- Responsive design
- Animated UI elements
- Error handling for invalid city names
- Remembers last searched city

## How to Run the App Locally

1. Clone or download this repository to your local machine.
2. Open the `index.html` file in your web browser.

## API Key Setup

This app uses the OpenWeatherMap API to fetch weather data. To use the app, you need to sign up for a free API key:

1. Go to [OpenWeatherMap](https://openweathermap.org/) and sign up for a free account.
2. Once logged in, go to your API keys page.
3. Copy your API key.
4. Open the `script.js` file and replace `'YOUR_API_KEY_HERE'` with your actual API key.

## Libraries Used

- [Axios](https://github.com/axios/axios) for making API requests
- [Animate.css](https://animate.style/) for animations

These libraries are included via CDN in the `index.html` file, so you don't need to install them separately.

## Customizing the App

- To change the design, modify the `styles.css` file.
- To add or modify weather conditions displayed, update the `displayWeather` function in `script.js`.
- To change animations, refer to the [Animate.css documentation](https://animate.style/) and update the classes in `index.html`.

## Hosting Recommendation

You can easily host this app for free on platforms like [Netlify](https://www.netlify.com/) or [Vercel](https://vercel.com/). Simply upload your project files to a GitHub repository and connect it to your Netlify or Vercel account for automatic deployment.

