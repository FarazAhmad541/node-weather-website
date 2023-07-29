const fetchWeatherData = async (location, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=ec0bc526cebfb44072f2e704f2217e31&query=${location}`;
  const res = await fetch(url);
  const data = await res.json();
  callback(data);
};

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOneElement = document.querySelector("#message-one");
const messageTwoElement = document.querySelector("#message-two");

weatherForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const location = search.value;
  messageOneElement.textContent = "Loading...";
  messageTwoElement.textContent = "";
  fetchWeatherData(location, (data) => {
    if (!data) {
      messageOneElement.textContent = "Unable to connect to weather services";
    } else if (data.error) {
      messageOneElement.textContent =
        "Cannot find weather data for the provided location, Try another search";
    } else {
      const temperature = data.current.temperature;
      const feelslike = data.current.feelslike;
      const description = data.current.weather_descriptions[0];
      const location = data.location.name + "," + " " + data.location.country;

      messageOneElement.textContent = location;
      messageTwoElement.textContent =
        description +
        ". It is currently " +
        temperature +
        " degress outside. Feels Like " +
        feelslike +
        " degrees.";

      console.log(
        description +
          ". It is currently " +
          temperature +
          " degress outside. Feels Like " +
          feelslike +
          " degrees."
      );
    }
  });
});
