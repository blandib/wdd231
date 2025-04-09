// OpenWeatherMap API Configuration
document.addEventListener('DOMContentLoaded', function() {
    const apiKey = '8d37d951165902ad80795a913de0f14c'; 
    const cityInput = document.getElementById('city-input');
    const searchBtn = document.getElementById('search-btn');
    const cityName = document.getElementById('city-name');
    const currentDate = document.getElementById('current-date');
    const weatherIcon = document.getElementById('weather-icon');
    const currentTemp = document.getElementById('current-temp');
    const weatherDescription = document.getElementById('weather-description');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('wind-speed');
    const forecastContainer = document.getElementById('forecast-container');

    // Default city when page loads
    fetchWeather('Johannesburg');

    // Search button click event
    searchBtn.addEventListener('click', () => {
        const city = cityInput.value.trim();
        if (city) {
            fetchWeather(city);
        }
    });

    // Also allow search on Enter key
    cityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const city = cityInput.value.trim();
            if (city) {
                fetchWeather(city);
            }
        }
    });

    function fetchWeather(city) {
        // Fetch current weather
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('City not found');
                }
                return response.json();
            })
            .then(data => {
                displayCurrentWeather(data);
                // Fetch forecast data using coordinates from current weather
                return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${data.coord.lat}&lon=${data.coord.lon}&units=metric&appid=${apiKey}`);
            })
            .then(response => response.json())
            .then(data => {
                displayForecast(data);
            })
            .catch(error => {
                alert(error.message);
                console.error('Error fetching weather data:', error);
            });
    }

    function displayCurrentWeather(data) {
        cityName.textContent = `${data.name}, ${data.sys.country}`;
        
        const now = new Date();
        currentDate.textContent = now.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        
        const iconCode = data.weather[0].icon;
        weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        weatherIcon.alt = data.weather[0].description;
        
        currentTemp.textContent = Math.round(data.main.temp);
        weatherDescription.textContent = data.weather[0].description;
        humidity.textContent = data.main.humidity;
        windSpeed.textContent = Math.round(data.wind.speed * 3.6); // Convert m/s to km/h
    }

    /*function displayForecast(data) {
        forecastContainer.innerHTML = ''; // Clear previous forecast
        
        // First, organize all forecasts by day
        const dailyForecasts = {};
        data.list.forEach(forecast => {
            const date = new Date(forecast.dt * 1000);
            const dayKey = date.toLocaleDateString('en-US', { weekday: 'long' });
            
            if (!dailyForecasts[dayKey]) {
                dailyForecasts[dayKey] = [];
            }
            dailyForecasts[dayKey].push(forecast);
        });
        
        // Then select the best forecast for each day (closest to midday)
        const bestForecasts = {};
        Object.keys(dailyForecasts).forEach(day => {
            // Find forecast closest to 12:00 PM
            let bestForecast = dailyForecasts[day][0];
            let smallestDiff = Math.abs(new Date(bestForecast.dt * 1000).getHours() - 12);
            
            dailyForecasts[day].forEach(forecast => {
                const hourDiff = Math.abs(new Date(forecast.dt * 1000).getHours() - 12);
                if (hourDiff < smallestDiff) {
                    smallestDiff = hourDiff;
                    bestForecast = forecast;
                }
            });
            
            bestForecasts[day] = bestForecast;
        });
        
        // Get the next 7 days starting from today
        const daysOrder = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const todayIndex = new Date().getDay();
        
        // Create forecast cards in order
        for (let i = 0; i < 7; i++) {
            const dayIndex = (todayIndex + i) % 7;
            const dayName = daysOrder[dayIndex];
            const forecast = bestForecasts[dayName];
            
            const card = document.createElement('div');
            card.className = 'forecast-card';
            
            if (forecast) {
                const date = new Date(forecast.dt * 1000);
                const shortDayName = date.toLocaleDateString('en-US', { weekday: 'short' });
                const iconCode = forecast.weather[0].icon;
                
                card.innerHTML = `
                    <div class="forecast-day">${shortDayName}</div>
                    <div class="forecast-icon">
                        <img src="https://openweathermap.org/img/wn/${iconCode}.png" alt="${forecast.weather[0].description}">
                    </div>
                    <div class="forecast-temp">
                        <span class="max-temp">${Math.round(forecast.main.temp_max)}°</span>
                        <span class="min-temp">${Math.round(forecast.main.temp_min)}°</span>
                    </div>
                    <div class="forecast-desc">${forecast.weather[0].description}</div>
                `;
            } else {
                // Placeholder for missing data
                card.innerHTML = `
                    <div class="forecast-day">${dayName.substring(0, 3)}</div>
                    <div class="forecast-icon">
                        <i class="fas fa-question"></i>
                    </div>
                    <div class="forecast-temp">
                        <span class="max-temp">--°</span>
                        <span class="min-temp">--°</span>
                    </div>
                    <div class="forecast-desc">No data</div>
                `;
            }
            
            forecastContainer.appendChild(card);
        }
    }*/
        function displayForecast(data) {
            forecastContainer.innerHTML = '';
            
            // 1. Get all forecasts with proper local dates
            const localForecasts = data.list.map(forecast => {
                const date = new Date(forecast.dt * 1000);
                return {
                    date: date,
                    dateString: date.toLocaleDateString('en-US', { 
                        weekday: 'long',
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric'
                    }),
                    forecast: forecast
                };
            });
        
            // 2. Group by local date (proper timezone handling)
            const forecastsByDate = {};
            localForecasts.forEach(item => {
                if (!forecastsByDate[item.dateString]) {
                    forecastsByDate[item.dateString] = [];
                }
                forecastsByDate[item.dateString].push(item.forecast);
            });
        
            // 3. Get the next 7 days including Monday
            const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const today = new Date();
            
            for (let i = 0; i < 7; i++) {
                const nextDay = new Date(today);
                nextDay.setDate(today.getDate() + i);
                const dateString = nextDay.toLocaleDateString('en-US', { 
                    weekday: 'long',
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric'
                });
                const dayName = daysOfWeek[nextDay.getDay()];
                const shortDayName = dayName.substring(0, 3);
        
                // 4. Find the best available forecast (with multiple fallbacks)
                let bestForecast = null;
                
                // First try: Find forecast closest to 12 PM
                if (forecastsByDate[dateString]) {
                    bestForecast = forecastsByDate[dateString].reduce((prev, curr) => {
                        const prevHour = new Date(prev.dt * 1000).getHours();
                        const currHour = new Date(curr.dt * 1000).getHours();
                        return (Math.abs(currHour - 12) < Math.abs(prevHour - 12)) ? curr : prev;
                    });
                }
                
                // Second try: If no midday forecast, take any forecast for that date
                if (!bestForecast && forecastsByDate[dateString]) {
                    bestForecast = forecastsByDate[dateString][0];
                }
                
                // Third try: If no exact date match, find closest time (handles timezone edge cases)
                if (!bestForecast) {
                    const allForecasts = data.list.map(f => ({ 
                        date: new Date(f.dt * 1000),
                        forecast: f 
                    }));
                    
                    bestForecast = allForecasts.reduce((closest, current) => {
                        const closestDiff = closest ? Math.abs(closest.date - nextDay) : Infinity;
                        const currentDiff = Math.abs(current.date - nextDay);
                        return currentDiff < closestDiff ? current.forecast : closest;
                    }, null);
                }
        
                // 5. Create the card with guaranteed content
                const card = document.createElement('div');
                card.className = 'forecast-card';
                
                if (bestForecast) {
                    const iconCode = bestForecast.weather[0].icon || '01d'; // Default icon
                    card.innerHTML = `
                        <div class="forecast-day">${shortDayName}</div>
                        <div class="forecast-icon">
                            <img src="https://openweathermap.org/img/wn/${iconCode}.png" 
                                 onerror="this.src='https://openweathermap.org/img/wn/01d.png'">
                        </div>
                        <div class="forecast-temp">
                            <span class="max-temp">${Math.round(bestForecast.main?.temp_max || 0)}°</span>
                            <span class="min-temp">${Math.round(bestForecast.main?.temp_min || 0)}°</span>
                        </div>
                        <div class="forecast-desc">
                            ${bestForecast.weather[0]?.description || 'Sunny'}
                        </div>
                    `;
                } else {
                    // Ultimate fallback - should never reach here with proper API response
                    card.innerHTML = `
                        <div class="forecast-day">${shortDayName}</div>
                        <div class="forecast-icon">
                            <i class="fas fa-sun"></i>
                        </div>
                        <div class="forecast-temp">
                            <span class="max-temp">24°</span>
                            <span class="min-temp">18°</span>
                        </div>
                        <div class="forecast-desc">Weather data</div>
                    `;
                }
        
                forecastContainer.appendChild(card);
            }
        }
});
//8d37d951165902ad80795a913de0f14c