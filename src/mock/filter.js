const isFilmInFilterCategory = (items, filterCategory) => {
  const result = items.filter((item) => item[filterCategory]);
  return result.length;
};

const genereteFilmFilters = (filmCards) => {
  const filmFilters = {
    watchlist: isFilmInFilterCategory(filmCards, 'isWatchList'),
    history: isFilmInFilterCategory(filmCards, 'isWatched'),
    favorites: isFilmInFilterCategory(filmCards, 'isFavorite'),
  };

  return Object.entries(filmFilters).map(([filterName, countFilms]) => ({
    name: filterName,
    count: countFilms,
  }));
};
export default genereteFilmFilters;
