import React from 'react';
import './Promo.css';
import { Link } from 'react-router-dom';

const NavPromo = () => {
  return (
    <nav className='promo__buttons-promo'>
      <ul className='promo__list-promo'>
        <li><Link className='promo__link promo__link_type_register' to='/signup'>Регистрация</Link></li>
        <li><Link className='promo__link promo__link_type_login' to='/signin'>Войти</Link></li>
      </ul>
    </nav>
  );
};

export default NavPromo;
