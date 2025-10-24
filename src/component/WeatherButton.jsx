import React from 'react';
import { Button } from 'react-bootstrap';

const WeatherButton = ({ cities, handleCityChange, selectedCity }) => {
  console.log('cities', cities);
  return (
    <div>
      <Button
        variant='warning'
        onClick={() => handleCityChange('current')}
        className={selectedCity === null ? 'active' : ''}
      >
        Current Location
      </Button>
      {cities.map((item, index) => (
        <Button
          key={index}
          variant='warning'
          onClick={() => handleCityChange(item)}
          className={selectedCity === item ? 'active' : ''}
        >
          {item}
        </Button>
      ))}
    </div>
  );
};

export default WeatherButton;
