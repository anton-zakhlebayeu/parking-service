import * as process from 'process';

function getParkingPlaces() {
  const envParkingPlaces = parseInt(process.env.PARKING_PLACES || '5');
  return envParkingPlaces <= 0 ? 5 : envParkingPlaces;
}

export const config = {
  environment: process.env.ENVIRONMENT || 'local',
  parkingPlaces: getParkingPlaces(),
};
