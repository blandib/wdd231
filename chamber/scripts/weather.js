const apiKey = "8d37d951165902ad80795a913de0f14c";
const defaultCity = "Johannesburg";
const lat = -26.2041; // Johannesburg latitude
const lon = 28.0473; // Johannesburg longitude;

// Function to fetch current weather
async function fetchCurrentWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
        const data = await response.json();
        displayCurrentWeather(data);
    } catch (error) {
        console.error("Error fetching current weather data:", error);
    }
}

// Function to display current weather
function displayCurrentWeather(data) {
    const weatherElement = document.getElementById("weather");
    weatherElement.innerHTML = `
        <h2>Current Weather</h2>
        <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
        <p><strong>Description:</strong> ${data.weather[0].description}</p>
        <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}">
    `;
}

// Function to fetch 7-day forecast
async function fetchForecast(lat, lon) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        displayForecast(data);
    } catch (error) {
        console.error("Error fetching forecast data:", error);
    }
}

// Function to display 7-day forecast
function displayForecast(data) {
    const forecastElement = document.getElementById("forecast");
    forecastElement.innerHTML = '';

    if (!data.daily) {
        forecastElement.innerHTML = `<p>Unable to fetch forecast data. Please check your API key or subscription level.</p>`;
        return;
    }

    data.daily.forEach((day, index) => {
        if (index === 0) return; // Skip today's weather

        const date = new Date(day.dt * 1000).toLocaleDateString();
        const temp = day.temp.day.toFixed(1);
        const icon = `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
        const description = day.weather[0].description;

        const dayElement = document.createElement("div");
        dayElement.className = "day";
        dayElement.innerHTML = `
            <h3>${date}</h3>
            <img src="${icon}" alt="${description}">
            <p><strong>Temperature:</strong> ${temp}°C</p>
            <p><strong>Description:</strong> ${description}</p>
        `;
        forecastElement.appendChild(dayElement);
    });
}

// Initialize app on page load
document.addEventListener("DOMContentLoaded", () => {
    fetchCurrentWeather(defaultCity);
    fetchForecast(lat, lon);
});
