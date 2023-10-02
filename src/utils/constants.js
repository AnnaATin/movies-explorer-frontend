export const LOCAL_STORAGE_TOKEN_KEY = 'jwt';
export const LOCAL_STORAGE_CURRENT_USER_KEY = 'currentUser';
export const LOCAL_STORAGE_LAST_SEARCH_QUERY = 'lastSearchQuery';
export const BEAT_API_URL = 'https://api.nomoreparties.co';
export const createData = (data, query) => {
    const { searchString, isShortMovie } = query;
    const regExpForNonWordSymbols = /[!,.\-'";:`{}(%«»]/g;
    if (isShortMovie) {
      return data.filter(
        (movie) =>
          movie.nameRU
            .trim()
            .replace(regExpForNonWordSymbols, '')
            .toLowerCase()
            .includes(searchString.trim().replace(regExpForNonWordSymbols, '').toLowerCase()) &&
          movie.duration <= 40,
      );
    } else {
      return data.filter((movie) =>
        movie.nameRU
          .trim()
          .replace(regExpForNonWordSymbols, '')
          .toLowerCase()
          .includes(searchString.trim().replace(regExpForNonWordSymbols, '').toLowerCase()),
      );
    }
  };
export const techs = [ 'HTML', 'CSS', 'JS', 'React', 'Git', 'Express.js', 'mongoDB' ];
export const portfolioData = [
    {
      title: 'Статичный сайт',
      url: 'https://github.com/AnnaATin/how-to-learn',
    },
    {
      title: 'Адаптивный сайт',
      url: 'https://github.com/AnnaATin/russian-travel',
    },
    {
      title: 'Одностраничное приложение',
      url: 'https://github.com/AnnaATin/react-mesto-api-full-gha',
    },
  ];
