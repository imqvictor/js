const cities = JSON.parse(localStorage.getItem("cities")) || [];
console.log(cities);

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
    const existingCityIndex = cities.indexOf(cityName);

    if (existingCityIndex !== -1) {
        cities.splice(existingCityIndex, 1);
    }

    cities.unshift(cityName);
    cities.length = 4;
    localStorage.setItem("cities", JSON.stringify(cities));
    searchInput.value = "";
    displayCities();

    const weatherUrl = `https://api.open-meteo.com/v1/forecast` +
        `?latitude=${latitude}` +
        `&longitude=${longitude}` +
        `&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m`;

    const weatherResponse = await fetch(weatherUrl);
    const weatherData = await weatherResponse.json();

    const temperature = weatherData.current.temperature_2m;
    const apparentTemperature = weatherData.current.apparent_temperature;
    const relativeHumidity = weatherData.current.relative_humidity_2m;
    const windSpeed = weatherData.current.wind_speed_10m;


    //Description
    const flTemperature = Math.floor(temperature);
    console.log(flTemperature);
    temperatureElement.textContent = `${flTemperature}°C`;
    const flRelativeHumidity = Math.floor(relativeHumidity);
    humidityElement.textContent = `Humidity: ${flRelativeHumidity} %`;
    const flApparentTemperature = Math.floor(apparentTemperature);
    feelsElement.textContent = `Feels Like: ${flApparentTemperature}°C`;
    const flWindSpeed = Math.floor(windSpeed);
    windElement.textContent = `Wind: ${flWindSpeed} km/h`;


    const clouds = [
        {
            image: "assets/calm.jpg",
            description: "The day is calm"
        },
        {
            image: "assets/cloudy.jpg",
            description: "Today it's cloudy"
        },
        {
            image: "assets/rainy.jpg",
            description: "Raining cats and dogs"
        },
        {
            image: "assets/sunny.jpg",
            description: "The Sun is here, enjoy Vitamin D"
        },
        {
            image: "assets/windy.jpg",
            description: "Let's catch some wind"
        },
    ];

    console.log(clouds[0].image);

    function backGroundImage() {

        if (flTemperature <= 17) {
            document.body.style.backgroundImage = `url("${clouds[2].image}")`;
            descriptionElement.textContent = `${clouds[2].description}`;
        }
        if (flTemperature >= 18 && flTemperature <= 21) {
            document.body.style.backgroundImage = `url("${clouds[1].image}")`;
            descriptionElement.textContent = `${clouds[1].description}`;
        }
        if (flTemperature > 21 && flTemperature <= 25) {
            document.body.style.backgroundImage = `url("${clouds[0].image}")`;
            descriptionElement.textContent = `${clouds[0].description}`;
        }
        if (flTemperature > 25) {
            document.body.style.backgroundImage = `url("${clouds[3].image}")`;
            descriptionElement.textContent = `${clouds[3].description}`;
        }
        if (flTemperature <= 17 && windSpeed > 10) {
            document.body.style.backgroundImage = `url("${clouds[4].image}")`;
            descriptionElement.textContent = `${clouds[4].description}`;
        }

    }

    backGroundImage();

    loading.textContent = "";
}


function displayCities() {

    recentElement.innerHTML = "";
    cities.forEach(element => {
        const city = document.createElement("p");
        city.textContent = element;

        city.addEventListener('click', () => {
            searchInput.value = element;
            searchWeather();
        })

        recentElement.appendChild(city);
    });
}
displayCities();
