let p = document.querySelector("p.timeupdate");

p.innerHTML = currentDayTime();

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

// homework week 5
function displayWeatherCondition(response) {
  console.log(response);
  let temperature = response.data.main.temp;
  let city = response.data.name;
  let cityElement = document.querySelector("h1");
  cityElement.innerHTML = city;
  let temperatureElement = document.querySelector("h2");
  temperatureElement.innerHTML = Math.round(temperature) + "º";
  let iconElement = document.querySelector("#icon");
  console.log(iconElement);
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
  console.log(city);
}

function searchLocation(position) {
  console.log(position);
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleCurrent(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function displayFarenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".temperature");
  let farenheitValue = temperatureElement.innerHTML * (9 / 5) + 32;
  console.log("Farenheit Temperature: " + farenheitValue);
  temperatureElement.innerHTML = Math.round(farenheitValue);
}

let btnSearch = document.querySelector("#btnSearch");
btnSearch.addEventListener("click", handleSearch);

let btnCurrent = document.querySelector("#btnCurrent");
btnCurrent.addEventListener("click", handleCurrent);

let btnFarenheit = document.querySelector("#btnFarenheit");
btnFarenheit.addEventListener("click", displayFarenheitTemperature);
