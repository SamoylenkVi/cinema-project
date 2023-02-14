export const FILM_COUNT = 23;
export const TEXT_LIMIT = 140;
export const MOVIE_CARD_YEAR_FORMAT = 'YYYY';
export const RELEASE_DATE_FORMAT = 'DD MMMM YYYY';
export const COMMENT_DATE_FORMAT = 'YYYY/MM/DD HH:m';
export const ACTIVE_BUTTON_CLASS = 'film-card__controls-item--active';
export const Keys = {
  ESCAPE: 'Escape',
  ESC: 'Esc',
};
export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

export const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating',
};

export const FilterType = {
  ALL_MOVIES: 'all',
  WATCHLIST: 'watchlist',
  HISTORY: 'history',
  FAVORITES: 'favorites',
};

export const UserAction = {
  UPDATE_FILM: 'UPDATE_FILM',
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
  SORT_FILMS: 'SORT_FILMS',
  FILTER_FILMS: 'FILTER_FILMS',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};
