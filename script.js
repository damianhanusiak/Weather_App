const cityInput = document.querySelector("input");
const sendBtn = document.querySelector("button");
const pError = document.querySelector(".error");
const cityName = document.querySelector(".city-name");
const weatherIcon = document.querySelector("#icon");
const weatherInfo = document.querySelector("p.weather-info");
const temperature = document.querySelector("p.temperature");
const humidity = document.querySelector("p.humidity");
const windSpeed = document.querySelector("p.wind-speed");

const API_KEY = "47eaf43cd866b2cb0ee540e2606c14eb";
const API_UNITS = "&units=metric";

const getWeather = () => {
	const city = cityInput.value;
	const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}${API_UNITS}`;

	fetch(URL)
		.then(res => res.json())
		.then(data => {
			cityName.textContent = data.name;
			weatherInfo.textContent = data.weather[0].main;
			temperature.textContent = data.main.temp + " °C";
			humidity.textContent = data.main.humidity + " %";
			windSpeed.textContent = data.wind.speed + " km/h";
			cityInput.value = "";
			pError.textContent = "";

			const id = data.weather[0].id;
			resetIcon();
			if (id >= 200 && id <= 232) {
				weatherIcon.classList.toggle("fa-cloud-bolt");
			} else if (id >= 300 && id <= 321) {
				weatherIcon.classList.toggle("fa-cloud-rain");
			} else if (id >= 500 && id <= 531) {
				weatherIcon.classList.toggle("fa-cloud-showers-heavy");
			} else if (id >= 600 && id <= 622) {
				weatherIcon.classList.toggle("fa-snowflake");
			} else if (id >= 701 && id <= 781) {
				weatherIcon.classList.toggle("fa-smog");
			} else if (id === 800) {
				weatherIcon.classList.toggle("fa-sun");
			} else if (id >= 801 && id <= 804) {
				weatherIcon.classList.toggle("fa-cloud");
			} else {
				weatherIcon.classList.toggle("fa-cloud-sun");
			}
		})
		.catch(() => {
			pError.textContent = "Incorrect city name! Try again!";
		});
};

const resetIcon = () => {
	weatherIcon.classList = "fa-solid";
};

sendBtn.addEventListener("click", getWeather);

window.addEventListener("keydown", e => {
	if (e.key === "Enter") {
		getWeather();
	}
});
