import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import lg_logo from '../assets/lg_logo.png';

type Props = {};

const Login: React.FC<Props> = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    //logic here
    navigate('/');
  };

  const handleSignUpRedirect = () => {
    navigate('/signup');
  };

  return (
    <div className="login">
      <div className="login-background"></div>
      <img className="lg-logo" src={lg_logo} alt="LG logo" />
      <div className="welcome-text">WELCOME</div>

      <input type="text" placeholder="Username" className="input-field" />
      <input type="password" placeholder="Password" className="input-field" />

      <button className="login-button" onClick={handleLogin}>Login</button>

      <div className="forget-password-text">Forget password/username</div>
      <div className="sign-up-text">
        <span>Don’t have an account? </span>
        <span className="signup-link" onClick={handleSignUpRedirect}>
          Sign Up
        </span>
      </div>
    </div>
  );
};

export default Login;
