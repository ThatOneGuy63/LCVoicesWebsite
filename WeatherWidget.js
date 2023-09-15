const accessToken = '7334a45d-c1b8-42fe-b9d5-ca471aa71258';
const deviceID = 296093;
const socket = new WebSocket(`wss://ws.weatherflow.com/swd/data?token=${accessToken}`);

// Function to update the HTML widget with weather data
function updateWeatherWidget(temperature, weatherType) {
  const weatherWidget = document.getElementById('weather-widget');
	weatherWidget.innerHTML = `${temperature.toFixed(0)} °F & ${weatherType}<br>At Landmark College`;

}

// Function to map precipitation type to weather conditions
function mapPrecipitationType(precipitationType) {
  switch (precipitationType) {
    case 0:
      return 'Sunny';
    case 1:
      return 'Rain';
    case 2:
      return 'Hail';
    default:
      return 'Unknown';
  }
}

socket.onopen = () => {
  const listenStartMessage = {
    type: 'listen_start',
    device_id: deviceID,
    id: 'listen_start_id'
  };
  socket.send(JSON.stringify(listenStartMessage));
  console.log('WebSocket connection open.');
};

socket.onmessage = (event) => {
  const message = JSON.parse(event.data);
  console.log(event.data);
  switch (message.type) {
    case 'obs_st':
      const temperature = message.obs[0][7]; // Air Temperature in Celsius
      const precipitationType = message.obs[0][13]; // Precipitation Type
      const weatherType = mapPrecipitationType(precipitationType);
      // Update the HTML widget with the weather data
      updateWeatherWidget((temperature * 9 / 5) + 32, weatherType);
      console.log(`Temperature: ${temperature} °C, Weather: ${weatherType}`);
      break;

    case 'ack':
      console.log('Acknowledgment received.');
      break;

    // Add more cases for other message types if needed
    default:
      // Handle unknown message types here
  }
};

socket.onclose = () => {
  console.log('WebSocket connection closed.');
};

socket.onerror = (error) => {
  console.error('WebSocket error:', error);
};

window.onbeforeunload = () => {
  const listenStopMessage = {
    type: 'listen_stop',
    device_id: deviceID,
    id: 'listen_stop_id'
  };
  socket.send(JSON.stringify(listenStopMessage));
};
