import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';


function MoviesCard(props) {
  const location = useLocation();

  function getTimeFromMins(mins) {
    let hours = Math.trunc(mins / 60);
    let minutes = mins % 60;
    return `${hours}ч ${minutes}м`;
  }

  const [isLiked, setLike] = useState(false);

  function handleCardLike() {
    setLike(!isLiked);
  }

  const cardButtonClassName = location.pathname === '/saved-movies'
    ? 'movie__remove'
    : !isLiked ? 'movie__like' : 'movie__like_active'

  return (
    <li className='movie'>
      <div className='movie__card'>
        <img
          className='movie__picture'
          src={props.card.image}
          alt='Фильм'
        />
        <button
          className={cardButtonClassName}
          type='button'
          onClick={handleCardLike}
          >
        </button>
      </div>
      <div className='movie__header'>
        <h2 className='movie__title'>{props.card.nameRU}</h2>
        <p className='movie__duration'>{getTimeFromMins(props.card.duration)}</p>
      </div>
    </li>
  );
}

export default MoviesCard;
