import React from 'react';
import { useNavigate } from 'react-router-dom';
import lgLogo from '../assets/lg_logo.png';
import './Login-SignUp.css'

type Props = {};

const Login: React.FC<Props> = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    //logic here
    navigate('/home');
  };

  const handleSignUpRedirect = () => {
    navigate('/signup');
  };

  return (
    <div className="login-container">
      <img className="lg-logo" src={lgLogo} alt="LG logo" />
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
