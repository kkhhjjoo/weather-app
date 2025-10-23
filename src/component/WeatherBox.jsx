import React from 'react';

const WeatherBox = ({ weather }) => {
  console.log('weather', weather);
  return (
    <div className='weather-box'>
      {/* <div>{weather && weather.name}</div> */}
      <div>{weather?.name}</div>
      <h2>{weather?.main.temp}C/{Math.round((weather?.main.temp)*1.8 + 32) }화씨</h2>
      <h3>{weather?.weather[0].description}</h3>
    </div>
  )
}

export default WeatherBox;
