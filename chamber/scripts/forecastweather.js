const apiKey = "15b7c720f81f42feaffd4c4fbb44c08b"; 
const city = "Johannesburg"; 
const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

// DOM Elements
const currentTemp = document.getElementById("current-temp");
const currentCondition = document.getElementById("current-condition");
const currentIcon = document.getElementById("current-icon");
const forecastDays = document.getElementById("forecast-days");

// Function to get weather icon URL
function getWeatherIconUrl(iconCode) {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

// Fetch Weather Data
async function fetchWeather() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Current Weather
    const currentWeather = data.list[0];
    currentTemp.textContent = `${currentWeather.main.temp}°C`;
    currentCondition.textContent = currentWeather.weather[0].description;
    currentIcon.src = getWeatherIconUrl(currentWeather.weather[0].icon);

    // 3-Day Forecast
    const forecastData = data.list.filter((item, index) => index % 8 === 0).slice(0, 3); // Get 3 days
    forecastDays.innerHTML = forecastData.map((day) => `
      <div class="forecast-day">
        <p><strong>${new Date(day.dt * 1000).toLocaleDateString("en-US", { weekday: "short" })}</strong></p>
        <img src="${getWeatherIconUrl(day.weather[0].icon)}" alt="${day.weather[0].description}">
        <p>${day.main.temp}°C</p>
        <p>${day.weather[0].description}</p>
      </div>
    `).join("");
  } catch (error) {
    console.error("Error fetching weather data:", error);
    currentTemp.textContent = "Error";
    currentCondition.textContent = "Error";
    currentIcon.src = "";
    forecastDays.innerHTML = "<p>Error loading forecast.</p>";
  }
}

// Call the function to fetch weather data
fetchWeather();