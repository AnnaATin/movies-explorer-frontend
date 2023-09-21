import React, { useContext, useEffect, useState } from 'react';
import './Navigation.css';
import Menu from './Menu/Menu';
import Burger from './Burger/Burger';
import { DeviceContext } from '../../contexts/DeviceContext';
import { useLocation } from 'react-router-dom';
import NavPromo from './Promo/Promo';

const Navigation = () => {
  const location = useLocation();
  const [menuActive, setMenuActive] = useState(false);
  const device = useContext(DeviceContext);
  const [isDesktop, setDesktop] = useState(true);

  const handleMenu = () => {
    setMenuActive(!menuActive);
  };

  useEffect(() => {
    if (device === 'desktop') {
      setDesktop(true);
      setMenuActive(false);
    } else {
      setDesktop(false);
    }
  }, [device]);

  return (
    <>
      {location.pathname === '/' ? (
        <NavPromo />
      ) : (
        <>
          {isDesktop ? (
            <Menu isDesktop={isDesktop} />
          ) : (
            <button
              type='button'
              className='header__burger-btn'
              onClick={handleMenu}
            />
          )}
          <Burger
            active={menuActive}
            onCloseMenu={handleMenu}
          />
        </>
      )}
    </>
  );
};

export default Navigation;
