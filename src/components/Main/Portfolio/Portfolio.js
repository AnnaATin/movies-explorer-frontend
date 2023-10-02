import React from 'react';
import './Portfolio.css';
import { portfolioData } from '../../../utils/constants';
import { Link } from 'react-router-dom';

const Portfolio = () => {
  return (
    <section className='portfolio'>
      <h4 className='portfolio__title'>Портфолио</h4>
      <ul className='portfolio__list'>
        {portfolioData.map((item) => {
          return (
            <li
              key={item.title}
              className='portfolio__item'
            >
              <Link
                className='portfolio__link'
                to={item.url}
                target='_blank'
              >
                {item.title}
                <span className='portfolio__icon'>↗</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Portfolio;
