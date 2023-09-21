import Menu from '../Menu/Menu';
import './Burger.css';

const Burger = ({ active, onCloseMenu }) => {
  return (
    <div className={active ? 'menu menu_active' : 'menu'}>
      <div
        className='menu__hover'
        onClick={onCloseMenu}
      >
        <div className='menu__content' onClick={(e) => e.stopPropagation()}>
          <button
            type='button'
            aria-label='Закрыть'
            className='menu__close'
            onClick={onCloseMenu}
          />
          <Menu />
        </div>
      </div>
    </div>
  );
};

export default Burger;
