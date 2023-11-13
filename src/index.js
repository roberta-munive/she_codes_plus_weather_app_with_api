function capitalizeFirstLetterOfWordsInString(str) {
  str = str.toLowerCase().trim();
  let word_array = str.split(" ");
  for (var i = 0; i < word_array.length; i++) {
    word_array[i] = word_array[i][0].toUpperCase() + word_array[i].substring(1);
  }

  return word_array.join(" ");
}

function displayCityName(city) {
  // city = capitalizeFirstLetterOfWordsInString(city);
  let currentCityLocator = document.querySelector("#current-city");
  currentCityLocator.innerHTML = city;
}

function displayCurrentDayOfWeek() {
  let dayOfWeekLocator = document.querySelector("#current-day-of-week");
  let now = new Date();
  let dayOfWeekAsDigit = now.getDay();
  let day = getDayOfWeekFullLength(dayOfWeekAsDigit);
  dayOfWeekLocator.innerHTML = day;
}

function displayCurrentTime() {
  let currentTimeLocator = document.querySelector("#current-time");
  let now = new Date();

  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  currentTimeLocator.innerHTML = `${hour}:${minutes}`;
}

function displayCurrentWeatherConditions(response) {
  displayCityName(response.data.city);

  let currentTemperature = response.data.temperature.current;
  currentTemperature = Math.round(currentTemperature);
  let currentTemperatureLocator = document.querySelector(
    "#current-temperature-value"
  );
  currentTemperatureLocator.innerHTML = currentTemperature;

  let currentConditionDescription = response.data.condition.description;
  let currentConditionLocator = document.querySelector(
    "#current-condition-description"
  );
  currentConditionLocator.innerHTML = currentConditionDescription;

  let currentHumidity = response.data.temperature.humidity;
  let humidityLocator = document.querySelector("#humidity");
  humidityLocator.innerHTML = `${currentHumidity}%`;

  let currentWindSpeed = response.data.wind.speed;
  currentWindSpeed = Math.round(currentWindSpeed);
  let windSpeedLocator = document.querySelector("#wind-speed");
  windSpeedLocator.innerHTML = `${currentWindSpeed} mi/hr`;

  let currentWeatherIconUrl = response.data.condition.icon_url;
  let currentWeatherIconLocator = document.querySelector(
    "#current-weather-icon"
  );
  currentWeatherIconLocator.src = currentWeatherIconUrl;
}

function getCurrentWeatherConditions(event) {
  event.preventDefault();
  let apiKey = "cf14b4c0f0c0d7a973ee3b4e430t2bo5";
  let unit = "imperial";
  let citySearchBarLocator = document.querySelector("#city-search-bar");
  let city = citySearchBarLocator.value;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayCurrentWeatherConditions);
}

function getDayOfWeekFullLength(dayOfWeekAsDigit) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[dayOfWeekAsDigit];
}

function getDefaultWeatherConditions() {
  let apiKey = "cf14b4c0f0c0d7a973ee3b4e430t2bo5";
  let unit = "imperial";
  let city = "paris";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayCurrentWeatherConditions);
}

displayCurrentDayOfWeek();

displayCurrentTime();

getDefaultWeatherConditions();

let citySearchInputLocator = document.querySelector("#city-search-input");
citySearchInputLocator.addEventListener("submit", getCurrentWeatherConditions);
