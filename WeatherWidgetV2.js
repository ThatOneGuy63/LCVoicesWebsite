const accessToken = '7334a45d-c1b8-42fe-b9d5-ca471aa71258';
const stationID = 118392;
const conditionsUrl = `https://swd.weatherflow.com/swd/rest/better_forecast?station_id=${stationID}&units_temp=f&units_wind=mps&units_pressure=mb&units_precip=mm&units_distance=km&api_key=${accessToken}`;
const temperatureUrl = `https://swd.weatherflow.com/swd/rest/observations/stn/${stationID}?bucket=1&ob_fields=air_temp&units_temp=f&units_wind=mps&units_pressure=mb&units_precip=mm&units_distance=km&api_key=${accessToken}`;
const tempestDisplay = 'https://tempestwx.com/station/118392';
const options = { method: 'GET', headers: { accept: 'application/json' } };

// Function to update the HTML widget with weather data
function updateWeatherWidget(temperature, conditions) {
  const weatherWidget = document.getElementById('weather-widget');
  weatherWidget.innerHTML = `<a href="${tempestDisplay}" target="_blank">${temperature} °F & ${conditions}<br>At Landmark College</a>`;
}

// Fetch both temp and condition data and update the widget when both requests are complete
Promise.all([fetch(conditionsUrl, options), fetch(temperatureUrl, options)])
  .then(([conditionsResponse, temperatureResponse]) => {
    if (!conditionsResponse.ok || !temperatureResponse.ok) {
      throw new Error('Failed to fetch weather data');
    }
    return Promise.all([conditionsResponse.json(), temperatureResponse.json()]);
  })
  .then(([conditionsData, temperatureData]) => {
    const conditions = conditionsData.current_conditions.conditions;
    const airTemp = temperatureData.obs[0][2];
    updateWeatherWidget(airTemp, conditions);
  })
  .catch(err => console.error(err));
