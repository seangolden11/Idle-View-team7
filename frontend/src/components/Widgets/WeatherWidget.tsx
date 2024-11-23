import React, { useEffect, useState } from 'react';
import './WeatherWidget.css';
import axios from 'axios';

import MoonSvg  from '../../assets/svgs/moon.svg';
import CloudSvg  from '../../assets/svgs/cloud.svg';
import SunSvg  from '../../assets/svgs/sun.svg';
import RainSvg  from '../../assets/svgs/rainy.svg';

interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  weather: { main: string }[];
  sys: { sunrise: number; sunset: number };
  timezone: number;
}

const WeatherWidget: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('Seoul');
  const [location, setLocation] = useState<string>('Seoul');
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [dragging, setDragging] = useState<boolean>(false);
  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLocation(inputValue);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (dragging) {
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  useEffect(() => {
    if (dragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]);

  useEffect(() => {
    if (location) {
      axios
<<<<<<< HEAD
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=&units=metric`)
=======
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid={API_KEY}&units=metric`)
>>>>>>> login
        .then((response) => {
          setWeatherData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
        });
    }
  }, [location]);

  if (!weatherData) return <div>Loading...</div>;

  const currentTimeUTC = new Date().getTime() / 1000;
  const localTime = currentTimeUTC + weatherData.timezone;
  const isDayTime = localTime > weatherData.sys.sunrise && localTime < weatherData.sys.sunset;

  const containerStyle: React.CSSProperties = {
    position: "absolute",
    left: `${position.x}px`,
    top: `${position.y}px`,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "250px",
    borderRadius: "35px",
    padding: "20px",
    background: "linear-gradient(to bottom, #0e1c26, #2a454b, #294861)",
    color: "white",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
    margin: "10px",
    cursor: dragging ? "grabbing" : "grab",
    transition: "box-shadow 0.2s",
  };

  return (
    <div style={containerStyle} onMouseDown={handleMouseDown}>
      {isDayTime ? <img src={SunSvg} className="sun" /> : <img src={MoonSvg} className="moon" />}
      <div className="cloud-container">
        <img src={CloudSvg} className="cloud" />
      </div>
      <div className="temperature">{Math.round(weatherData.main.temp)}°</div>
      <div className="weather">{weatherData.weather[0].main}</div>
      <div className="low-high">
        {Math.round(weatherData.main.temp_min)}° / {Math.round(weatherData.main.temp_max)}°
      </div>
      <div className="feels-like">Feels like: {Math.round(weatherData.main.feels_like)}°</div>
      <form onSubmit={handleFormSubmit}>
        <input
          className="location"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </form>
      <div className="humidity">Humidity: {weatherData.main.humidity}%</div>
    </div>
  );
};

export default WeatherWidget;
