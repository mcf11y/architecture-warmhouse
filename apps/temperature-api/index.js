const express = require('express');
const app = express();
const PORT = 8081;

const sensorIdToLocation = {
  '1': 'Living Room',
  '2': 'Bedroom',
  '3': 'Kitchen',
};

const locationToSensorId = {
  'Living Room': '1',
  'Bedroom': '2',
  'Kitchen': '3',
};

function getRandomTemperature() {
  return Math.round((15 + Math.random() * 15) * 10) / 10;
}

function buildResponse(sensorId, location) {
  return {
    value: getRandomTemperature(),
    unit: '°C',
    timestamp: new Date().toISOString(),
    location,
    status: 'active',
    sensor_id: sensorId,
    sensor_type: 'temperature',
    description: `Temperature sensor in ${location}`,
  };
}

app.get('/temperature', (req, res) => {
  let location = req.query.location || '';
  let sensorId = req.query.sensorId || '';

  if (!location && sensorId) {
    location = sensorIdToLocation[sensorId] || 'Unknown';
  }
  if (!sensorId && location) {
    sensorId = locationToSensorId[location] || '0';
  }
  if (!location && !sensorId) {
    location = 'Unknown';
    sensorId = '0';
  }

  res.json(buildResponse(sensorId, location));
});

app.get('/temperature/:sensorId', (req, res) => {
  const sensorId = req.params.sensorId;
  const location = sensorIdToLocation[sensorId] || 'Unknown';

  res.json(buildResponse(sensorId, location));
});

app.listen(PORT, () => {
  console.log(`Temperature API running on port ${PORT}`);
});
