import { useEffect, useState, useCallback } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherBox from './component/WeatherBox';
import WeatherButton from './component/WeatherButton';
import { ClipLoader } from 'react-spinners';
import { Container } from 'react-bootstrap';

const API_KEY = '6a7359b5cbfccffff659f39f38caff86';

//1. 앱이 실행되자마자 현재위치 기반의 날씨가 보인다.
//2. 날씨정보에는 도시, 섭씨, 화씨 날씨 상태
//3. 5개의 버튼이 있다. (1개는 현재위치, 4개는 다른도시)
//4. 도시버튼을 클릭할 때마다 도시별 날씨가 보인다.
//5. 현재위치 버튼을 누르면 다시 현재위치 기반의 날씨가 나온다.
//6. 데이터를 들고오는 동안 로딩 스피너가 돈다
function App() {
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState(null);
  const [weather, setWeather] = useState(null);
  const [apiError, setAPIError] = useState('');
  const cities = ['Paris', 'New york', 'Tokyo', 'Seoul'];
  const getWeatherByCurrentLocation = useCallback(async (lat, lon) => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
      const res = await fetch(url);
      const data = await res.json();

      setWeather(data);
      setLoading(false);
    } catch (err) {
      setAPIError(err.message);
      setLoading(false);
    }
  }, []);

  const getCurrentLocation = useCallback(() => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      console.log('현재위치', lat, lon);
      getWeatherByCurrentLocation(lat, lon);
    });
  }, [getWeatherByCurrentLocation]);
  useEffect(() => {
    getCurrentLocation();
  }, [getCurrentLocation]);

  const getWeatherByCity = useCallback(async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
      setLoading(true);
      const res = await fetch(url);
      const data = await res.json();
      // console.log('Data', data);
      setWeather(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setAPIError(err.message);
      setLoading(false);
    }
  }, [city]);
  useEffect(() => {
    if (city == null) {
      getCurrentLocation();
    } else {
      getWeatherByCity();
    }
  }, [city, getCurrentLocation, getWeatherByCity]);

  const handleCityChange = (city) => {
    if (city === 'current') {
      setCity(null);
    } else {
      setCity(city);
    }
  };
  return (
    <div>
      <Container className='vh-100'>
        {loading ? (
          <div className='w-100 vh-100 d-flex justify-content-center align-items-center'>
            <ClipLoader color='#f86c6b' size={150} loading={loading} />
          </div>
        ) : !apiError ? (
          <div className='main-container'>
            <WeatherBox weather={weather} />
            <WeatherButton
              cities={cities}
              handleCityChange={handleCityChange}
              selectedCity={city}
            />
          </div>
        ) : (
          apiError
        )}
      </Container>
    </div>
  );
}

export default App;
