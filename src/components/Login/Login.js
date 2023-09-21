import React from 'react';
import './Login.css';
import Auth from '../Auth/Auth';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin, onRegister }) => {
  const navigate = useNavigate();
  return (
    <div className='login'>
      <div onClick={() => navigate('/')} className='login__logo'></div>
      <h2 className='login__title'>Рады видеть!</h2>
      <Auth isRegForm={false} onLogin={onLogin} onRegister={onRegister} />
    </div>
  );
};

export default Login;
