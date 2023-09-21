import React from 'react';
import './Register.css';
import Auth from '../Auth/Auth';
import { useNavigate } from 'react-router-dom';

const Register = ({ onLogin, onRegister }) => {
  const navigate = useNavigate();
  return (
    <div className='login'>
      <div onClick={() => navigate('/')} className='login__logo'></div>
      <h2 className='login__title'>Добро пожаловать!</h2>
      <Auth isRegForm={true} onLogin={onLogin} onRegister={onRegister} />
    </div>
  );
};

export default Register;
