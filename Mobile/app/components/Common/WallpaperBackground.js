import React from 'react';
import moment from 'moment-timezone';
import { ImageBackground } from 'react-native';

function getWallpaper() {
  const hour = moment().tz('Asia/Ho_Chi_Minh').hour();
  if (hour >= 0 && hour <= 3) {
    return require('../../assets/images/wallaper/midnight.jpg');
  }
  if (hour >= 6 && hour <= 9) {
    return require('../../assets/images/wallaper/sunrise.jpg');
  }
  if (hour >= 10 && hour <= 12) {
    return require('../../assets/images/wallaper/noon.jpg');
  }
  if (hour >= 13 && hour <= 14) {
    return require('../../assets/images/wallaper/afternoon.jpg');
  }
  if (hour >= 15 && hour <= 16) {
    return require('../../assets/images/wallaper/evening.jpg');
  }
  if (hour >= 17 && hour <= 18) {
    return require('../../assets/images/wallaper/sunset.jpg');
  }
  return require('../../assets/images/wallaper/night.jpg');
}

const WallpaperBackground = ({ children, onPress }) => { // eslint-disable-line
  return (
    <ImageBackground
      style={{
        width: '100%',
        height: '100%',
      }}
      onPress={onPress}
      source={getWallpaper()}
    >
      { children }
    </ImageBackground>
  );
};

export default WallpaperBackground;