const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("searchBtn");
const loading = document.getElementById("loading");
const cityElement = document.getElementById("city");
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const humidityElement = document.getElementById('humidity');
const windElement = document.getElementById('wind');
const feelsElement = document.getElementById('feels');
const recentElement = document.getElementById('recent');

searchBtn.addEventListener('click', searchWeather);

async function searchWeather() {

    loading.textContent = "Loading...";

    const city = searchInput.value.trim();

    if (city === "") {
        alert("please enetr a city");
        return false;
    }


    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`;
    const response = await fetch(url);
    const data = await response.json();

    const cityName = data.results[0].name;
    cityElement.textContent = cityName;
    const latitude = data.results[0].latitude;
    const longitude = data.results[0].longitude;

    console.log(cityName);

    //recent searches
    const cities = JSON.parse(localStorage.getItem("cities")) || [];
    console.log(cities);
    cities.unshift(cityName);
    cities.length = 4;
    localStorage.setItem("cities", JSON.stringify(cities));

    recentElement.innerHTML = "";
    cities.forEach(element => {
        const city = document.createElement("p");
        city.textContent = element;

        recentElement.appendChild(city);
    });


    const weatherUrl = `https://api.open-meteo.com/v1/forecast` +
        `?latitude=${latitude}` +
        `&longitude=${longitude}` +
        `&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m`;

    const weatherResponse = await fetch(weatherUrl);
    const weatherData = await weatherResponse.json();

    const temperature = weatherData.current.temperature_2m;
    temperatureElement.textContent = `${temperature}°C`;
    const apparentTemperature = weatherData.current.apparent_temperature;
    feelsElement.textContent = `Feels Like: ${apparentTemperature}°C`;
    const relativeHumidity = weatherData.current.relative_humidity_2m;
    humidityElement.textContent = `Humidity: ${relativeHumidity} %`;
    const windSpeed = weatherData.current.wind_speed_10m;
    windElement.textContent = `Wind: ${windSpeed} km/h`;

    //Description
    const flTemperature = Math.floor(temperature);
    console.log(flTemperature);
    if (flTemperature >= 25) {
        descriptionElement.textContent = "Description: Hot Sunny Day";
    } else {
        descriptionElement.textContent = "Description: Cold Chilly Day";
    }

    loading.textContent = "";
}


