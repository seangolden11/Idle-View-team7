import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./screens/HomePage";
import LoginPage from "./screens/LoginPage";
import SignUpPage from "./screens/SignUpPage";
import { useState } from "react";

import background1 from './assets/background-1.jpg';
import background2 from './assets/background-2.jpg';
import background3 from './assets/background-3.jpg';
import background4 from './assets/background-4.jpg';

function App() {
  const [backgroundImage, setBackgroundImage] = useState(0);
  const [brightness, setBrightness] = useState(100);

  // Adjust the brightness based on slider input
  const changeBrightness = (newBrightness: number) => {
    setBrightness(newBrightness);
  };

  const backgrounds = [
    background1,
    background2,
    background3,
    background4,
  ];

  const changeBackground = () => {
    setBackgroundImage((prevImage) => {
      const nextIndex = (prevImage + 1) % backgrounds.length;
      return nextIndex;
    });
  };

  return (
    <Router>
      <div
        className="app brightness-100"
        style={{
          backgroundImage: `url(${backgrounds[backgroundImage]})`,
          filter: `brightness(${brightness}%)`
        }}
      >
        <Routes>
          {/* Redirect from '/' to '/home' */}
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route
            path="/home"
            element={<HomePage onBackgroundChange={changeBackground} onBrightnessChange={changeBrightness} />}
          />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
