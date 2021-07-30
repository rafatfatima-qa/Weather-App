/* By Default Current City, Date and Weather details*/  
let now = new Date();
let date = document.querySelector('.location .date');
date.innerText = dateBuilder(now);

let query = `Karachi, Pk`;

fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&APPID=21fcf12af2601a16bbc2c200ff00e93c`)
  .then(weather => {
    return weather.json();
}).then(displayResults);

// let inputValue = searchbox.value;
// let myKey = "21fcf12af2601a16bbc2c200ff00e93c"; 

const api = {
  key: "21fcf12af2601a16bbc2c200ff00e93c",
  base: "https://api.openweathermap.org/data/2.5/"
};

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
    //console.log(searchbox.value);
  }
}
function getResults (query) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&APPID=21fcf12af2601a16bbc2c200ff00e93c`)
    .then(weather => {
      return weather.json();
  }).then(displayResults);
}

function displayResults (weather) {
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;
  // console.log(Math.round(weather.main.temp));

  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;

  // const FEEL = Math.round(weather.main.feels_like) + " °C";
  // document.querySelector("#feel").innerHTML = FEEL;
}

function dateBuilder (d) {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}