import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Settings from "./components/Settings";
import AddWidgets from "./components/AddWidgets";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Navbar/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/settings" element={<Settings/>}/>
          <Route path="/add-widgets" element={<AddWidgets/>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
