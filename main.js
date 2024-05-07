"use strict";

import axios from "axios";

const instance = axios.create({
  baseURL: "http://api.weatherapi.com/v1",
});

export const fetchForecastWeather = async (q = "", day = 1) => {
  const { data } = await instance.get("/forecast.json", {
    params: {
      day: day,
      q: q,
      key: "7e3aa98d0d394983b9975256240705",
    },
  });
  return data;
};
export const fetchAutocompleteWeather = async (q = "") => {
  const { data } = await instance.get("/forecast.json", {
    params: {
      q: q,
      key: "7e3aa98d0d394983b9975256240705",
    },
  });
  return data;
};

const input = document.querySelector(".search__input");
const btn = document.querySelector(".search__button");
const temp = document.querySelector(".weather__temp");
const city = document.querySelector(".weather__city");
const imgMain = document.querySelector(".condition-img");
const textCurrently = document.querySelector(".condition-text");
const date = document.querySelector(".condition-date");
const feelsLike = document.querySelector('p[data-textCondition="feelslike"]');
const wind = document.querySelector('p[data-textCondition="wind_mph"]');
const humidity = document.querySelector('p[data-textCondition="humidity"]');
const uv = document.querySelector('p[data-textCondition="uv"]');
// const hour = document.querySelector(".details__hour");
// const imgByTime = document.querySelector(".details__img");
// const textByTime = document.querySelector(".details__text");
const tempRange = document.querySelector(".details__text-range");

document.addEventListener("DOMContentLoaded", () => {
  const userResponse = confirm("Дозволити доступ до місцезнаходження?");

  if (userResponse) {
    try {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const currentLocation = `${latitude}, ${longitude}`;
          const dataAutocomplete = await fetchForecastWeather(currentLocation);
          updateWeatherInfo(dataAutocomplete);
          updateWeatherInfoDetails(dataAutocomplete);
        },
        (error) => {
          console.error("Помилка отримання геолокації:", error);
        }
      );
    } catch (error) {
      console.error("Помилка при спробі отримати геолокацію:", error);
    }
  } else {
    console.log("Користувач відхилив запит на доступ до місцезнаходження.");
  }
});
btn.addEventListener("click", async () => {
  const cityName = input.value;

  try {
    const dataForecast = await fetchForecastWeather(cityName);
    updateWeatherInfo(dataForecast);
    updateWeatherInfoDetails(dataForecast);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    // Handle error
  }
});

function updateWeatherInfo(data) {
  city.textContent = `${data.location.name}, ${data.location.country}`;
  imgMain.src = `${data.current.condition.icon}`;
  textCurrently.textContent = data.current.condition.text;
  date.textContent = data.location.localtime;
  feelsLike.textContent = `${data.current.feelslike_c}∘`;
  wind.textContent = `${data.current.wind_dir} ${data.current.wind_kph}kph`;
  humidity.textContent = `${data.current.humidity} %`;
  uv.textContent = `${data.current.uv}`;
  tempRange.textContent = `Max t : ${data.forecast.forecastday[0].day.maxtemp_c}   Min t : ${data.forecast.forecastday[0].day.mintemp_c}`;
}

function updateWeatherInfoDetails(data) {
  const arrHours = data.forecast.forecastday[0].hour;
  const detailsContainer = document.querySelector(".details");
  const markup = `    
    <div class="details__col">
      <p class="details__hour"></p>
      <img class="details__img" src="" alt="">
      <p class="details__text"></p>
    </div>
  `;

  detailsContainer.innerHTML = arrHours.map((hourData) => markup).join("");

  const detailsCols = document.querySelectorAll(".details__col");

  detailsCols.forEach((detailsCol, index) => {
    const hourData = arrHours[index];
    const hourElement = detailsCol.querySelector(".details__hour");
    const imgElement = detailsCol.querySelector(".details__img");
    const textElement = detailsCol.querySelector(".details__text");

    hourElement.textContent = hourData.time;
    imgElement.src = hourData.condition.icon;
    textElement.textContent = hourData.condition.text;
  });
}
