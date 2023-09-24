import React from 'react';
import './PromoBtn.css';
import { Link } from 'react-router-dom';

const NavPromo = () => {
  return (
    <nav className='promo-btn'>
      <ul className='promo-btn__list-promo'>
        <li><Link className='promo-btn__link promo-btn__link_register' to='/signup'>Регистрация</Link></li>
        <li><Link className='promo-btn__link promo-btn__link_login' to='/signin'>Войти</Link></li>
      </ul>
    </nav>
  );
};

export default NavPromo;
