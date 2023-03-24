export const TEXT_LIMIT = 140;
export const ACTIVE_BUTTON_CLASS = 'film-card__controls-item--active';

export const Keys = {
  ESCAPE: 'Escape',
  ESC: 'Esc',
  COMMAND: 'metaKey',
  CONTROL: 'ctrlKey',
  ENTER: 'Enter',

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
  STATISTIC: 'statistic',
};

export const FilterMode = {
  MOVIES: 'movies',
  STATISTIC: 'statistic',
};

export const UserAction = {
  UPDATE_FILM: 'UPDATE_FILM',
  UPDATE_COMMENTS: 'UPDATE_COMMENTS',
  SORT_FILMS: 'SORT_FILMS',
  FILTER_FILMS: 'FILTER_FILMS',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

export const StatisticPeriod = {
  All: 'all-time',
  DAY: 'today',
  WEEK: 'week',
  MONTH: 'month',
  YEAR: 'year',
};

export const DayFormat = {
  MONTH_FORMAT: 'MM YYYY',
  YEAR_FORMAT: 'YYYY',
  FULL_DATA_FORMAT: 'DD MMMM YYYY',
  DATA_TIME_FORMAT: 'YYYY/MM/DD HH:m',
};
