function currentDayTime() {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hours = now.getHours();
  let minutes = now.getMinutes();

  return `${day} ${hours}:${minutes}`;
}

function getForecast(coordinates) {
  let apiKey = "864f1d5561eb65003352ba542cf51e26";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

// homework week 5
function displayWeatherCondition(response) {
  let temperature = response.data.main.temp;

  let city = response.data.name;
  let cityElement = document.querySelector("h1");
  cityElement.innerHTML = city;
  let temperatureElement = document.querySelector("h2");
  let temperatureValue = Math.round(temperature);
  temperatureElement.innerHTML = temperatureValue + "°";
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  let weather = response.data.weather[0].main;
  let humidity = response.data.main.humidity;
  let wind = response.data.wind.speed;
  let statusElement = document.querySelector(".status");
  statusElement.innerHTML =
    weather +
    " <br /> Humidity: " +
    humidity +
    "%<br />Wind: " +
    Math.round(wind) +
    "km/h";

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "864f1d5561eb65003352ba542cf51e26";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSearch(event) {
  event.preventDefault();
  let city = document.querySelector(".cityform").value;
  search(city);
}

function searchLocation(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleCurrent(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHtml = "";
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHtml =
        forecastHtml +
        `
        <div class="card text-center">
          <img src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">${formatDay(forecastDay.dt)}</h5>
            <p class="card-text">${Math.round(
              forecastDay.temp.min
            )}°/<strong>${Math.round(forecastDay.temp.max)}°</strong></p>
          </div>
        </div>
        `;
    }
  });
  forecastElement.innerHTML = forecastHtml;
}

let p = document.querySelector("p.timeupdate");

p.innerHTML = currentDayTime();

let btnSearch = document.querySelector("#btnSearch");
btnSearch.addEventListener("click", handleSearch);

let btnCurrent = document.querySelector("#btnCurrent");
btnCurrent.addEventListener("click", handleCurrent);

search("Copenhagen");
