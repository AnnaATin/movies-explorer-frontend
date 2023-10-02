/* eslint-disable no-undef */
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Suspense, useEffect, useState } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { DeviceContext, windowWidth } from '../../contexts/DeviceContext';
import Preloader from '../AllMovies/Preloader/Preloader';
import Main from '../Main/Main';
import Movies from '../AllMovies/Movies/Movies';
import NotFound from '../NotFound/NotFound';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import SavedMovies from '../AllMovies/SavedMovies/SavedMovies';
import './App.css'

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import api from '../../utils/MainApi';
import { ApiServiceContext } from '../../contexts/ApiServiceContext';
import { BEAT_API_URL, LOCAL_STORAGE_TOKEN_KEY } from '../../utils/constants';
import InfoTooltip from '../Popup/InfoTooltip/InfoTooltip';
import beatApi from '../../utils/MoviesApi';
import PopupVideo from '../Popup/PopupVideo/PopupVideo';


const App = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [currentUser, setCurrentUser] = useState({
    isLoggedIn: localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY) ? true : false,
  });
  const [device, setDevice] = useState('desktop');
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [currentMovie, setCurrentMovie] = useState({});

  const [isInfoPopupOpen, setInfoPopupOpen] = useState(false);
  const [isVideoPopupOpen, setVideoPopupOpen] = useState(false);
  const [apiService, setApiService] = useState({});

  const checkToken = async () => {
    if (localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)) {
      try {
        const userInfo = await api.getUserInfo();
        setCurrentUser((prev) => ({
          ...prev,
          name: userInfo.name,
          email: userInfo.email,
          isLoggedIn: true,
        }));
      } catch (e) {
        localStorage.clear();
        setCurrentUser((prev) => ({ ...prev, isLoggedIn: false }));
        handleError('С токеном что-то не так.')
      }
    }
  };

  const handleUserRegister = async ({ email, password, name }) => {
    try {
      enableLoader();
      await api.registerUser({ email, password, name });
      handleUserLogin({ email, password });
      setInfoPopupOpen(true);
      setApiService((prev) => ({
        ...prev,
        successText: `Вы успешно зарегистрировались.`,
      }));
    } catch (e) {
      handleError(e);
    } finally {
      disableLoader();
    }
  };

  const handleUserLogin = async ({ email, password }) => {
    try {
      enableLoader();
      const { token } = await api.loginUser({ email, password });
      localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);
      setCurrentUser((prev) => ({ ...prev, isLoggedIn: true }));
      navigate('/movies', { replace: true });
    } catch (e) {
      handleError(e);
    } finally {
      disableLoader();
    }
  };

  const handleUserLogout = () => {
    setCurrentUser((prev) => ({ ...prev, isLoggedIn: false }));
    localStorage.clear();
    navigate('/', { replace: true });
  };

  const handleChangeProfileData = ({ name, email }) => {
    enableLoader();
    api
      .setUserInfo({ name, email })
      .then((userData) => {
        setCurrentUser((currentUser) => ({
          ...currentUser,
          name: userData.name,
          email: userData.email,
        }));
        setInfoPopupOpen(true);
        setApiService((prev) => ({
          ...prev,
          successText: `Данные обновлены.`,
        }));
      })
      .catch((e) => {
        handleError(e);
      })
      .finally(() => {
        disableLoader();
      });
  };

  const closeAllPopups = () => {
    setInfoPopupOpen(false);
    setVideoPopupOpen(false);
    setTimeout(() => {
      setApiService((prev) => ({ ...prev, isError: false }));
    }, 200);
  };

  const enableLoader = () => {
    setApiService((prev) => ({ ...prev, isLoading: true }));
  };

  const disableLoader = () => {
    setApiService((prev) => ({ ...prev, isLoading: false }));
  };

  const handleError = (e) => {
    setApiService((prev) => ({ ...prev, isError: true, unsuccessText: e }));
    setInfoPopupOpen(true);
  };

  const handleSearchError = () => {
    handleError('Для поиска нужно ввести запрос.');
  };

  const handleOpenTrailer = (movie) => {
    try {
      enableLoader();
      setVideoPopupOpen(true);
      setCurrentMovie(movie);
    } catch (e) {
      handleError(e);
    } finally {
      setTimeout(() => disableLoader(), 200);
    }
  };

  const handleClickLikeMovie = (movie) => {
    const movieData = {
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: BEAT_API_URL + movie.image.url,
      trailerLink: movie.trailerLink,
      thumbnail: BEAT_API_URL + movie.image.formats.thumbnail.url,
      movieId: movie.id,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
    };
    api
      .likeMovie(movieData)
      .then((savedMovie) => setSavedMovies((movies) => [...movies, savedMovie]))
      .catch((e) => console.error(e));
  };

  const handleClickDeleteMovie = (movieId) => {
    api
      .deleteMovie(movieId)
      .then(() => setSavedMovies((films) => films.filter((movie) => movie._id !== movieId)))
      .catch((e) => console.error(e));
  };

  useEffect(() => {
    const handleWidth = () => {
      if (window.innerWidth > windowWidth.tablet) {
        setDevice('desktop');
      } else if (window.innerWidth > windowWidth.mobile) {
        setDevice('tablet');
      } else {
        setDevice('mobile');
      }
    };
    handleWidth();
    window.addEventListener('resize', handleWidth);
    return () => window.removeEventListener('resize', handleWidth);
  }, [device]);

  useEffect(() => {
    if(currentUser.isLoggedIn) {
      checkToken();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser.isLoggedIn]);

  useEffect(() => {
    if (currentUser.isLoggedIn && (pathname === '/signin' || pathname === '/signup')) {
      navigate('/movies', { replace: true });
    }
  }, [pathname, navigate, currentUser.isLoggedIn]);

  useEffect(() => {
    if (currentUser.isLoggedIn) {
      beatApi
        .getMovies()
        .then(setMovies)
        .catch((e) => {
          console.error(e);
        });
      api
        .getLikedMovies()
        .then((movies) => setSavedMovies(movies))
        .catch((e) => {
          console.error(e);
        });
    }
  }, [currentUser.isLoggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <DeviceContext.Provider value={device}>
        <ApiServiceContext.Provider value={apiService}>
          <Suspense fallback={<Preloader />}>
          <section className="app">
            <Routes>
              <Route
                path='/'
                element={<Main />}
              />
              <Route
                path='/signup'
                element={
                  <Register
                    onLogin={handleUserLogin}
                    onRegister={handleUserRegister}
                  />
                }
              />
              <Route
                path='/signin'
                element={
                  <Login
                    onLogin={handleUserLogin}
                    onRegister={handleUserRegister}
                  />
                }
              />
              <Route element={<ProtectedRoute />}>
                <Route
                  path='/movies'
                  element={
                    <Movies
                      movies={movies}
                      savedMovies={savedMovies}
                      onSave={handleClickLikeMovie}
                      onDelete={handleClickDeleteMovie}
                      onError={handleSearchError}
                      onTrailerClick={handleOpenTrailer}
                    />
                  }
                />
                <Route
                  path='/saved-movies'
                  element={
                    <SavedMovies
                      movies={savedMovies}
                      savedMovies={savedMovies}
                      onDelete={handleClickDeleteMovie}
                      onError={handleSearchError}
                      onTrailerClick={handleOpenTrailer}
                    />
                  }
                />
                <Route
                  path='/profile'
                  element={
                    <Profile
                      onLogout={handleUserLogout}
                      onSubmit={handleChangeProfileData}
                    />
                  }
                />
              </Route>
              <Route
                path='*'
                element={<NotFound />}
              />
            </Routes>
            </section>
          </Suspense>
          <InfoTooltip
            isOpen={isInfoPopupOpen}
            onClose={closeAllPopups}
          />
          <PopupVideo
            isOpen={isVideoPopupOpen}
            onClose={closeAllPopups}
            name={currentMovie.nameRU}
            link={currentMovie.trailerLink}
          />
        </ApiServiceContext.Provider>
      </DeviceContext.Provider>
    </CurrentUserContext.Provider>
  );
};

export default App;
