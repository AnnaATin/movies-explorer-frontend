import React from 'react';
import './Techs.css';
import Section from '../Section/Section';
import { techs } from '../../../utils/constants';

const Techs = () => {
  return (
    <section className='techs' id='techs'>
      <Section>Технологии</Section>
      <article className='techs__content'>
        <h4 className='techs__article-title'>7 технологий</h4>
        <p className='techs__article-caption'>
          На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
        </p>
        <ul className='techs__tech-list'>
          {techs.map((tech) => {
            return <li key={tech} className='techs__tech-element'>{tech}</li>;
          })}
        </ul>
      </article>
    </section>
  );
};

export default Techs;
