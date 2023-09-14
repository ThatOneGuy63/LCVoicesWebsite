const accessToken = '7334a45d-c1b8-42fe-b9d5-ca471aa71258';
const deviceID = 296093;
const socket = new WebSocket(`wss://ws.weatherflow.com/swd/data?token=${accessToken}`);

// Function to update the HTML widget with weather data
function updateWeatherWidget(temperature) {
  const weatherWidget = document.getElementById('weather-widget');
  weatherWidget.textContent = `Temperature: ${temperature.toFixed(0)} °F`;
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
      const temperature = message.summary.feels_like;
      // Update the HTML widget with the weather data
      updateWeatherWidget((temperature * 9 / 5) + 32);
      console.log(`Temperature: ${temperature} °C`);
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
