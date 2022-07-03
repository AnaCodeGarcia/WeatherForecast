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
  console.log(coordinates);
  let apiKey = "864f1d5561eb65003352ba542cf51e26";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

// homework week 5
function displayWeatherCondition(response) {
  console.log(response);
  let temperature = response.data.main.temp;

  celsiusTemperature = temperature;

  let city = response.data.name;
  let cityElement = document.querySelector("h1");
  cityElement.innerHTML = city;
  let temperatureElement = document.querySelector("h2");
  temperatureElement.innerHTML = Math.round(temperature);
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

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".temperature");
  let fahrenheitValue = celsiusTemperature * (9 / 5) + 32;
  console.log("Fahrenheit Temperature: " + fahrenheitValue);
  temperatureElement.innerHTML = Math.round(fahrenheitValue);
  btnFahrenheit.disabled = true;
  btnCelsius.disabled = false;
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".temperature");
  console.log("Celsius temperature; " + celsiusTemperature);
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  btnFahrenheit.disabled = false;
  btnCelsius.disabled = true;
}

function displayForecast(response) {
  console.log(response.data.daily);

  let forecastElement = document.querySelector("#forecast");

  let forecastHtml = "";
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
        <div class="card text-center">
          <img src="images/cloundy.svg" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">${day}</h5>
            <p class="card-text">3°/<strong>6°</strong></p>
          </div>
        </div>
        `;
  });
  // forecastHtml =
  //   forecastHtml +
  //   `
  //       <div class="card text-center">
  //         <img src="images/cloundy.svg" class="card-img-top" alt="..." />
  //         <div class="card-body">
  //           <h5 class="card-title">Tue</h5>
  //           <p class="card-text">3°/<strong>6°</strong></p>
  //         </div>
  //       </div>
  //       <div class="card text-center">
  //         <img src="images/sunny.svg" class="card-img-top" alt="..." />
  //         <div class="card-body">
  //           <h5 class="card-title">Wed</h5>
  //           <p class="card-text">2°/<strong>5°</strong></p>
  //         </div>
  //       </div>
  //       <div class="card text-center">
  //         <img src="images/sunny.svg" class="card-img-top" alt="..." />
  //         <div class="card-body">
  //           <h5 class="card-title">Thu</h5>
  //           <p class="card-text">1°/<strong>5°</strong></p>
  //         </div>
  //       </div>
  //       <div class="card text-center">
  //         <img src="images/cloundy.svg" class="card-img-top" alt="..." />
  //         <div class="card-body">
  //           <h5 class="card-title">Fri</h5>
  //           <p class="card-text">1°/<strong>4°</strong></p>
  //         </div>
  //       </div>
  //       <div class="card text-center">
  //         <img src="images/snowing.svg" class="card-img-top" alt="..." />
  //         <div class="card-body">
  //           <h5 class="card-title">Sat</h5>
  //           <p class="card-text">-1°/<strong>3°</strong></p>
  //         </div>
  //       </div>
  // `;
  forecastElement.innerHTML = forecastHtml;
}

let p = document.querySelector("p.timeupdate");

p.innerHTML = currentDayTime();

let celsiusTemperature = null;

let btnSearch = document.querySelector("#btnSearch");
btnSearch.addEventListener("click", handleSearch);

let btnCurrent = document.querySelector("#btnCurrent");
btnCurrent.addEventListener("click", handleCurrent);

let btnFahrenheit = document.querySelector("#btnFarenheit");
btnFahrenheit.addEventListener("click", displayFahrenheitTemperature);

let btnCelsius = document.querySelector("#btnCelsius");
btnCelsius.addEventListener("click", displayCelsiusTemperature);

search("Copenhagen");
