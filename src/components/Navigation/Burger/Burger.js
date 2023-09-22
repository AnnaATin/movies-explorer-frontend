import Menu from '../Menu/Menu';
import './Burger.css';

const Burger = ({ active, onCloseMenu }) => {
  return (
    <section className={active ? 'menu menu_active' : 'menu'}>
      <section
        className='menu__hover'
        onClick={onCloseMenu}
      >
        <section className='menu__content' onClick={(e) => e.stopPropagation()}>
          <button
            type='button'
            aria-label='Закрыть'
            className='menu__button'
            onClick={onCloseMenu}
          />
          <Menu />
        </section>
      </section>
    </section>
  );
};

export default Burger;
