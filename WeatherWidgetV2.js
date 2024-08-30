const accessToken = '7334a45d-c1b8-42fe-b9d5-ca471aa71258';
const stationID = 118392;
const conditionsUrl = `https://swd.weatherflow.com/swd/rest/better_forecast?station_id=${stationID}&units_temp=f&units_wind=mps&units_pressure=mb&units_precip=mm&units_distance=km&api_key=${accessToken}`;
const temperatureUrl = `https://swd.weatherflow.com/swd/rest/observations/stn/${stationID}?bucket=1&ob_fields=air_temp&units_temp=f&units_wind=mps&units_pressure=mb&units_precip=mm&units_distance=km&api_key=${accessToken}`;
const tempestDisplay = `https://tempestwx.com/station/${stationID}`;
const options = { method: 'GET', headers: { accept: 'application/json' } };

// Function to update the HTML widget with weather data
function updateWeatherWidget(temperature, conditions) {
  const weatherWidget = document.getElementById('weather-widget');
  const tempestDisplay = `https://tempestwx.com/station/${stationID}`;

  // Create a new link element
  const link = document.createElement('a');
  link.href = tempestDisplay;
  link.target = '_blank';
  link.innerHTML = `${temperature} °F & ${conditions}<br>At Landmark College`;

  // Add the aria-label attribute to the link
  link.setAttribute('aria-label', `Opens in a new tab: ${temperature} degrees Fahrenheit and ${conditions} at Landmark College`);

  // Replace the content of the weather widget with the link
  weatherWidget.innerHTML = '';
  weatherWidget.appendChild(link);
}

// Fetch both temp and condition data and update the widget when both requests are complete
function fetchWeatherData() {
  Promise.all([fetch(conditionsUrl, options), fetch(temperatureUrl, options)])
    .then(([conditionsResponse, temperatureResponse]) => {
      if (!conditionsResponse.ok || !temperatureResponse.ok) {
        throw new Error('Failed to fetch weather data');
      }
      return Promise.all([conditionsResponse.json(), temperatureResponse.json()]);
    })
    .then(([conditionsData, temperatureData]) => {
      const conditions = conditionsData.current_conditions.conditions;
      const airTemp = temperatureData.obs[0][2].toFixed(0);
      updateWeatherWidget(airTemp, conditions);
    })
    .catch(err => console.error(err));
}
//call fetchWeatherData function when the page loads and every hour
fetchWeatherData ();
setInterval(fetchWeatherData, 3600000);

// Fetch weather data when the tab is visible (tab refresh)
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    fetchWeatherData();
  }
});
