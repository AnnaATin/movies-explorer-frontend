import React, { useContext, useEffect, useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import { useLocation } from 'react-router-dom';
import { DeviceContext } from '../../../contexts/DeviceContext';
import Preloader from '../../AllMovies/Preloader/Preloader';
import { BEAT_API_URL } from '../../../utils/constants';
import SearchMessage from '../SearchMessage/SearchMessage';

const MovieList = ({ movies, savedMovies, isLoading, text, onSave, onDelete, onTrailerClick }) => {
  const location = useLocation();
  const device = useContext(DeviceContext);
  const [showMoreButton, setShowMoreButton] = useState(true);
  const [renderCount, setRenderCount] = useState(0);
  const [page, setPage] = useState(0);
  const [isPagginationLoading, setPagginationLoading] = useState(false);

  const isSavedMovie = (movie) => {
    return savedMovies.reduce((a, saved) => {
      if (saved.movieId === movie.id) {
        movie._id = saved._id;
        return true;
      }
      return a;
    }, false);
  };

  const getImageUrl = (movie) => {
    return movie.movieId
      ? movie.image
      : BEAT_API_URL + movie.image.url
  }

  const getMovieId = (movie) => {
    return movie.movieId
      ? movie.movieId
      : movie.id
  }

  const renderMovies = (renderCount) => {
    if (movies.length > 0) {
      return movies.slice(0, renderCount).map((movie) => {
        return (
          <MoviesCard
            key={getMovieId(movie)}
            name={movie.nameRU}
            duration={movie.duration}
            link={getImageUrl(movie)}
            saved={isSavedMovie(movie)}
            movieData={movie}
            onSave={onSave}
            onDelete={onDelete}
            onTrailerClick={onTrailerClick}
          />
        );
      });
    }
  };

  const handleClickMore = () => {
    setShowMoreButton(false);
    setPagginationLoading(true);
    setTimeout(() => {
      setShowMoreButton(true);
      setPagginationLoading(false);
      setPage((prev) => prev + 1);
    }, 200);
  };

  useEffect(() => {
    const filmsRender = {
      desktop: {
        renderCount: 12,
        additionalRender: 3,
      },
      tablet: {
        renderCount: 8,
        additionalRender: 2,
      },
      mobile: {
        renderCount: 5,
        additionalRender: 2,
      },
    };
    setRenderCount(
      filmsRender[device].renderCount + filmsRender[device].additionalRender * page
    );
    movies.length >= renderCount ? setShowMoreButton(true) : setShowMoreButton(false);
  }, [device, movies, renderCount, page]);

  return (
    <section className='movies-list'>
      {movies.length === 0 && <SearchMessage>{text}</SearchMessage>}
      <ul className='movies-list__grid'>
      {isLoading ? <Preloader /> : renderMovies(renderCount)}
      </ul>
      <div className='movies-list__paggination-wrapper'>
        {showMoreButton && (
          <button
            onClick={handleClickMore}
            type='button'
            className={
              location.pathname === '/movies'
                ? 'movies-list__more'
                : 'movies-list__more-active'
            }
          >
            Ещё
          </button>
        )}
        {isPagginationLoading && <Preloader />}
      </div>
    </section>
  );
}

export default MovieList;
