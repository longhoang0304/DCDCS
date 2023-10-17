import React from 'react';
import moment from 'moment';
import { Image } from 'react-native';

function getWeatherImage(isRain, isCloud) {
  const hour = moment().hour();
  if (isRain) return require('../../assets/images/weather/cloud_rain.png');
  if (isCloud) return require('../../assets/images/weather/cloud.png');
  if (hour >= 5 && hour <= 17) {
    return require('../../assets/images/weather/sun.png');
  }
  return require('../../assets/images/weather/night.png');
}

const WeatherImage = ({ isRain, isCloud }) => { // eslint-disable-line
  return (
    <Image
      style={{
        width: 80,
        height: 80,
        // marginRight: 10,
      }}
      source={getWeatherImage(isRain, isCloud)}
    />
  );
};

export default WeatherImage;