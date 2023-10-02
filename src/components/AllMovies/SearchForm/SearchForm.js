import React, { useEffect, useState } from 'react';
import './SearchForm.css';
import { useLocation } from 'react-router-dom';
import { LOCAL_STORAGE_LAST_SEARCH_QUERY } from '../../../utils/constants';

const SearchForm = ({ onSubmit, isLoading, onError }) => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState({
    searchString: '',
    isShortMovie: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.searchString.trim()) {
      onError();
      return setSearchQuery({ ...searchQuery, searchString: '' });
    }
    onSubmit(searchQuery);
  };

  const handleChange = (e) => {
    setSearchQuery({ ...searchQuery, searchString: e.target.value });
  };

  const handleChangeTumbler = (e) => {
    if (!searchQuery.searchString.trim()) {
      onError();
      return setSearchQuery({ ...searchQuery, searchString: '' });
    }
    setSearchQuery({ ...searchQuery, isShortMovie: e.target.checked });
    onSubmit({ ...searchQuery, isShortMovie: e.target.checked });
  };

  useEffect(() => {
    if (location.pathname === '/movies' && localStorage.getItem(LOCAL_STORAGE_LAST_SEARCH_QUERY)) {
      const { searchString, isShortMovie } = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_LAST_SEARCH_QUERY),
      );
      setSearchQuery({
        searchString,
        isShortMovie,
      });
    }
  }, [location]);

  return (
    <section className='search-form' onSubmit={handleSubmit}>
      <form className='search-form__all'>
        <input
          type='text'
          placeholder='Фильм'
          className='search-form__input'
          onChange={handleChange}
          name='searchString'
          disabled={isLoading}
          value={searchQuery.searchString}
        />
        <button className='search-form__button'></button>
      </form>
      <label className='search-form__filter'>
          <input
            type='checkbox'
            className='search-form__tumbler'
            checked={searchQuery.isShortMovie}
            onChange={handleChangeTumbler}
            disabled={isLoading}
          />
          <span
            className='search-form__tumbler-visible'
            hidden
          ></span>
          <p className='search-form__filter-name'>Короткометражки</p>
        </label>
    </section>
  );
}

export default SearchForm;