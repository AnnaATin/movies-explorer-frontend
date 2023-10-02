import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import './SavedMovies.css';
import { useSearchFilms } from '../../../hooks/useSearchFilms';

const SavedMovies = ({ isLoggedIn, movies, onDelete, onError, onTrailerClick }) => {
  const { sortedMovies, handleSearch, isLoading, text } = useSearchFilms({
    movies: movies,
    isSavedPage: true,
  });

  return (
    <>
    <Header isLoggedIn={isLoggedIn} />
    <main className='saved-movies'>
      <SearchForm 
      onSubmit={handleSearch}
      movies={sortedMovies}
      onError={onError}
      />
      <MoviesCardList
        movies={sortedMovies}
        savedMovies={sortedMovies}
        isLoading={isLoading}
        text={text}
        onDelete={onDelete}
        onTrailerClick={onTrailerClick}
        >
      </MoviesCardList>
    </main>
    <Footer />
    </>
  );
}

export default SavedMovies;
