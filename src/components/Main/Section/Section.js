import React from 'react';
import './Section.css';

const Section = ({ children }) => {
  return (
    <h2 className='section'>{children}</h2>
  )
}

export default Section;
