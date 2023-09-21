import React from 'react';
import './AboutMe.css';
import Section from '../Section/Section';
import photo from '../../../images/student.png';
import { Link } from 'react-router-dom';
import Portfolio from '../Portfolio/Portfolio';

const AboutMe = () => {
  return (
    <section
      className='aboutme'
      id='aboutme'
    >
      <Section>Студент</Section>
      <div className='aboutme__all'>
        <div className='aboutme__info'>
          <h3 className='aboutme__name'>Виталий</h3>
          <p className='aboutme__job'>Фронтенд-разработчик, 30 лет</p>
          <p className='aboutme__text'>
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь.
            Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал
            в компании «СКБ Контур». После того, как прошёл курс по веб&#8209;разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <Link
            className='aboutme__link'
            to='https://github.com/AnnaATin'
            target='_blank'
          >
            Github
          </Link>
        </div>
        <img
          src={photo}
          alt='Фотография'
          className='about__photo'
        />
      </div>
      <Portfolio />
    </section>
  );
};

export default AboutMe;
