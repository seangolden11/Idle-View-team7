import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./screens/HomePage"
import LoginPage from "./screens/LoginPage";
import SignUpPage from "./screens/SignUpPage";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/home" element={<HomePage/>} />
          <Route path="/signup" element={<SignUpPage/>} />
          <Route path="/login" element={<LoginPage/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
