/* eslint-disable no-undef */
import { Route, Routes, useNavigate } from 'react-router-dom';
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
import { movies } from '../../utils/movies';

const App = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [device, setDevice] = useState('desktop');

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

  const handleLogin = () => {
    setCurrentUser((prev) => ({ ...prev, isLoggedIn: true }));
    navigate('/movies', { replace: true });
  };
  const handleRegister = () => {
    navigate('/signin');
  };
  const handleLogout = () => {
    setCurrentUser((prev) => ({ ...prev, isLoggedIn: false }));
    navigate('/', { replace: true });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <DeviceContext.Provider value={device}>
        <Suspense fallback={<Preloader/>}>
        <section className="app">
          <Routes>
            <Route
              path='/'
              element={<Main/>}
            />
            <Route
              path='/movies'
              element={<Movies list={movies} />}
            />
            <Route
              path='/saved-movies'
              element={<SavedMovies list={movies} />} 
            />
            <Route
              path='/profile'
              element={<Profile onLogout={handleLogout} />}
            />
            <Route
              path='/signup'
              element={
                <Register
                  onLogin={handleLogin}
                  onRegister={handleRegister}
                />
              }
            />
            <Route
              path='/signin'
              element={
                <Login
                  onLogin={handleLogin}
                  onRegister={handleRegister}
                />
              }
            />
            <Route
              path='*'
              element={<NotFound />}
            />
          </Routes>
        </section>  
        </Suspense>
      </DeviceContext.Provider>
    </CurrentUserContext.Provider>
  );
};

export default App;
