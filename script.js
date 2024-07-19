document
  .getElementById("weatherForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let city = document.getElementById("city").value;
    if (city === "") {
      alert("Please enter a city name.");
      return;
    }

    let apiKey = "573d92b5ef75e793158233e234734310";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.cod !== 200) {
          document.getElementById(
            "weatherResult"
          ).innerHTML = `<p>${data.message}</p>`;
        } else {
          let weatherDescription =
            (data.weather && data.weather[0] && data.weather[0].description) ||
            "N/A";
          let temperature = (data.main && data.main.temp) || "N/A";
          let humidity = (data.main && data.main.humidity) || "N/A";
          let windSpeed = (data.wind && data.wind.speed) || "N/A";

          document.getElementById("weatherResult").innerHTML = `
                    <h3>Weather in ${data.name}</h3>
                    <p>Description: <span>${weatherDescription}</span></p>
                    <p>Temperature: <span>${temperature} °C</span></p>
                    <p>Humidity: <span>${humidity} %</span></p>
                    <p>Wind Speed: <span>${windSpeed} m/s</span></p>
                `;
        }
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        document.getElementById(
          "weatherResult"
        ).innerHTML = `<p>There was an error fetching the weather data. Please try again later.</p>`;
      });
  });
