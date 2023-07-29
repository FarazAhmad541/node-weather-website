import request from "request";
const forecast = (address, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=ec0bc526cebfb44072f2e704f2217e31&query=${address}`;
  request({ url: url, json: true }, (error, response, body) => {
    if (error) {
      callback("Unable to connect to weather services", undefined, response);
    } else if (body.error) {
      callback(
        "Unable to find weather data for provided loaction",
        undefined,
        response
      );
    } else {
      const temperature = body.current.temperature;
      const feelslike = body.current.feelslike;
      const description = body.current.weather_descriptions[0];
      callback(
        undefined,
        description +
          ". It is currently " +
          temperature +
          " degress outside. Feels Like " +
          feelslike +
          " degrees.",
        response
      );
    }
  });
};

export { forecast };
