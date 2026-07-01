// ==========================
// OpenWeatherMap API Key
// Replace with your own API key
// ==========================

const API_KEY = "YOUR_API_KEY";

// ==========================
// Select Elements
// ==========================

const cityInput = document.getElementById("city");
const searchBtn = document.getElementById("searchBtn");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const icon = document.getElementById("icon");

// ==========================
// Search Button
// ==========================

searchBtn.addEventListener("click", () => {
    getWeather();
});

// Press Enter to Search
cityInput.addEventListener("keypress", function(e){

    if(e.key === "Enter"){
        getWeather();
    }

});

// ==========================
// Get Weather
// ==========================

async function getWeather(){

    const city = cityInput.value.trim();

    if(city === ""){

        alert("Please enter a city name.");
        return;

    }

    const url =
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try{

        const response = await fetch(url);

        if(!response.ok){

            throw new Error("City not found");

        }

        const data = await response.json();

        displayWeather(data);

    }

    catch(error){

        alert(error.message);

    }

}

// ==========================
// Display Weather
// ==========================

function displayWeather(data){

    cityName.textContent =
        `${data.name}, ${data.sys.country}`;

    temperature.textContent =
        `${Math.round(data.main.temp)}°C`;

    description.textContent =
        data.weather[0].description;

    humidity.textContent =
        `${data.main.humidity}%`;

    wind.textContent =
        `${data.wind.speed} km/h`;

    icon.src =
`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    icon.alt =
        data.weather[0].main;

}