import { useEffect, useState } from 'react';
import { LOCAL_STORAGE_LAST_SEARCH_QUERY } from '../utils/constants';
import { createData } from '../utils/constants';

export function useSearchFilms({ movies, isSavedPage, isMoviesPage }) {
  const [sortedMovies, setSortedMovies] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [text, setText] = useState('Введите название фильма в строку поиска.');
  const [lastSearchQuery, setLastSearchQuery] = useState({
    queryString: '',
    isShortMovie: false,
    data: [],
  });

  useEffect(() => {
    if (isSavedPage) {
      setSortedMovies(movies);
    }
  }, [isSavedPage, movies]);

  useEffect(() => {
    if (LOCAL_STORAGE_LAST_SEARCH_QUERY in localStorage) {
      setLastSearchQuery(JSON.parse(localStorage.getItem(LOCAL_STORAGE_LAST_SEARCH_QUERY)));
    }
  }, [isMoviesPage]);

  useEffect(() => {
    if (isMoviesPage) {
      setSortedMovies(lastSearchQuery.data);
    }
  }, [isMoviesPage, lastSearchQuery]);

  const handleSearch = (searchQuery) => {
    setLoading(true);

    const data = createData(movies, searchQuery);
    setSortedMovies(data);

    if (data.length === 0) {
      setText('Ничего не найдено.');
    }

    if (!searchQuery.searchString) {
      setText('Введите название фильма в строку поиска.')
      setSortedMovies([]);
    }

    setTimeout(() => {
      setLoading(false);
    }, 200);

    if (isMoviesPage) {
      localStorage.setItem(LOCAL_STORAGE_LAST_SEARCH_QUERY, JSON.stringify({
        searchString: searchQuery.searchString,
        isShortMovie: searchQuery.isShortMovie,
        data: data,
      }));
    }
  };
  
  return { sortedMovies, handleSearch, isLoading, text, };
};
