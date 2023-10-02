import React from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';

function MoviesCard(props) {
  const { name, duration, saved, link, onSave, movieData, onDelete, onTrailerClick } = props;
  const location = useLocation();

function getTimeFromMins(mins) {
    let hours = Math.trunc(mins / 60);
    let minutes = mins % 60;
    return `${hours}ч ${minutes}м`;
  }

  return (
    <li className='movie'>
      <section className='movie__card'>
        <img
          className='movie__picture'
          src={link}
          alt={name}
          onClick={() => onTrailerClick(movieData)}
        />
        {location.pathname === '/saved-movies' && (
          <button
          type='button'
          className='movie__remove'
          onClick={() => onDelete(movieData._id)}
        />
        )}
        {location.pathname === '/movies' && saved && (
          <button
          type='button'
          className='movie__like_active'
          onClick={() => onDelete(movieData._id)}
        />
        )}
        {location.pathname === '/movies' && !saved && (
          <button
          type='button'
          className='movie__like'
          onClick={() => onSave(movieData)}
        />
        )}
      </section>
      <section className='movie__header'>
        <h2 className='movie__title'>{name}</h2>
        <p className='movie__duration'>{getTimeFromMins(duration)}</p>
      </section>
    </li>
  );
}

export default MoviesCard;
