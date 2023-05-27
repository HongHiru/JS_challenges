const MYAPI_KEY = 'a1ed5979f7d85298a05d5a382007a485';

function onGeoErr() {
  alert("Can't find you. No weather for you.");
}

function onGeoOk(position) {
  console.log(position);
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${MYAPI_KEY}&units=metric`;
  console.log(url);
  fetch(url)
    .then((Response) => Response.json())
    .then((data) => {
      const city = document.querySelector('#weather span:first-child');
      const weather = document.querySelector('#weather span:last-child');
      city.innerHTML = data.name;
      weather.innerHTML = `\t${data.weather[0].main}\t${data.main.temp}`;
    });
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoErr);
