import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import './Movies.css';
import { useSearchFilms } from '../../../hooks/useSearchFilms';

const Movies = ({ movies, savedMovies, onSave, onDelete, onError, onTrailerClick }) => {
  const { sortedMovies, handleSearch, isLoading, text, } = useSearchFilms({
    movies: movies,
    isSavedPage: false,
    isMoviesPage: true,
  });

  return (
    <>
    <Header />
    <main className='movies'>
        <SearchForm 
        onSubmit={handleSearch}
        isLoading={isLoading}
        onError={onError}
        />
        <MoviesCardList 
        movies={sortedMovies}
        savedMovies={savedMovies}
        isLoading={isLoading}
        text={text}
        onSave={onSave}
        onDelete={onDelete}
        onTrailerClick={onTrailerClick}
        />
    </main>
    <Footer />
    </>
  );
}

export default Movies;
