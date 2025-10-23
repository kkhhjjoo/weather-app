import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherBox from './component/WeatherBox';
import WeatherButton from './component/WeatherButton';



//1. 앱이 실행되자마자 현재위치 기반의 날씨가 보인다.
//2. 날씨정보에는 도시, 섭씨, 화씨 날씨 상태
//3. 5개의 버튼이 있다. (1개는 현재위치, 4개는 다른도시)
//4. 도시버튼을 클릭할 때마다 도시별 날씨가 보인다.
//5. 현재위치 버튼을 누르면 다시 현재위치 기반의 날씨가 나온다.
//6. 데이터를 들고오는 동안 로딩 스피너가 돈다
function App() {
  const [weather, setWeather] = useState(null);
  const cities = ['Paris', 'New york', 'Tokyo', 'Seoul'];
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      console.log('현재위치', lat, lon);
      getWeatherByCurrentLocation(lat, lon);
    });
  }

  const getWeatherByCurrentLocation = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=6a7359b5cbfccffff659f39f38caff86&units=metric`;
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
  }
  useEffect(() => {
    getCurrentLocation()
  }, []);
  return (
    <div>
      <div className='container'>
        <WeatherBox weather={weather} />
        <WeatherButton cities={cities} />
      </div>  
    </div>
  )
}

export default App
