const apiKey = 'c66547a1563be9e44b6e52db58516839'
async function fetchWeatherData(city) {
    // This function makes an asynchronous API call to OpenWeatherMap, 
    // requesting weather data for a specific city. 
    // It uses the fetch API to make the HTTP request. 
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );

        if (!response.ok) {
            throw new Error("Unable to fetch weather data");
        }
        const data = await response.json();
        console.log(data);
        updateWeatherUI(data);
    } catch (error) {
    // If the response is not successful, 
    // it throws an error. Otherwise, it parses the JSON response,
    // logs the data,and calls updateWeatherUI to update the user interface.
        console.error(error);
    }
}

const cityElement = document.querySelector(".city");
const temperature = document.querySelector(".temp");
const windSpeed = document.querySelector(".wind-speed");
const humidity = document.querySelector(".humidity");
const visibility = document.querySelector(".visibility-distance");

const descriptionText = document.querySelector(".description-text");
const date = document.querySelector(".date");
 const descriptionIcon = document.querySelector('.description span');


function updateWeatherUI(data) {
    // this function updates HTML elements such as city name,temperature,wind speed,humidity,visibility,weather description,current date and day.
    cityElement.textContent = data.name;
    temperature.textContent = `${Math.round(data.main.temp)}°`;
    windSpeed.textContent = `${data.wind.speed} km/h`;
    humidity.textContent = `${data.main.humidity}%`;
    visibility.textContent = `${data.visibility / 1000} km`;

    const weatherIconName = getWeatherIconName(data.weather[0].main);
    descriptionIcon.innerHTML = `<span class="material-symbols-outlined">${weatherIconName}</span>`;
    // corresponding material icon for the weather condition(weatherIconName).
    
    descriptionText.textContent = data.weather[0].main; // Update description text
    const currentDate = new Date();
    date.textContent = currentDate.toDateString();
}

const formElement = document.querySelector(".search");
const inputElement = document.querySelector(".city-input");

formElement.addEventListener("click", function (e) {
    e.preventDefault();
    // this event listener is for the form submission,
    // preventing the default behavior, extracting the entered city,checking for non-empty input.
    const city = inputElement.value;
    if (city !== "") {
        fetchWeatherData(city);
        inputElement.value = "";
         // fetching weather data, and clearing the input field.
    }
});

 function getWeatherIconName(weatherCondition) {
    const iconMap = {
        Clear: "clear_day",
        Clouds: "partly_cloudy_day",
        Rain: "rainy",
        Thunderstorm: "thunderstorm",
        Mist: "mist",
        Fog: "foggy",
        Haze: "foggy",
        Smoke: "snowing",
        Snow: "ac_unit",

    };
    // this function provides a convenient way to map OpenWeatherMap weather conditions to google material icons. 
       return iconMap[weatherCondition] || "help";
    // this defaults to "help" which ensures that even if there's an unexpected or unrecognized weather condition, the function will still return a default icon(?).
 }