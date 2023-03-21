import Observer from '../utils/observer';
import { SortType, FilterType, MOVIE_CARD_YEAR_FORMAT } from '../constants';
import { dateSort, ratingSort, convertsDate } from '../utils/card';

const Filter = {
  ALL: '',
  WATCHLIST: 'isWatchList',
  HISTORY: 'isWatched',
  FAVORITES: 'isFavorite',
};

export default class Films extends Observer {
  constructor() {
    super();
    this._sortType = SortType.DEFAULT;
    this._filterType = FilterType.ALL_MOVIES;

    this._films = [];

    this._filteredFilms = [];
    this._filteredAndSortedFilms = [];
  }

  setFilms(updateType, films) {
    this._films = films.slice();
    this._filterFilms();
    this._sortFilms();
    this._notify(updateType);
  }

  get films() {
    return this._films;
  }

  get sortType() {
    return this._sortType;
  }

  get filterType() {
    return this._filterType;
  }

  _filterFilms() {
    this._filteredFilms = this._films.filter((film) => {
      const filterProp = Filter[this._filterType.toUpperCase()];
      return filterProp ? film[filterProp] : true;
    });
  }

  _sortFilms() {
    let sortByType;
    switch (this._sortType) {
      case SortType.DATE:
        sortByType = dateSort;
        break;
      case SortType.RATING:
        sortByType = ratingSort;
        break;
      default:
        sortByType = null;
        break;
    }

    if (typeof sortByType === 'function') {
      this._filteredAndSortedFilms = this._filteredFilms.slice().sort(sortByType);
    } else {
      this._filteredAndSortedFilms = this._filteredFilms.slice();
    }
  }

  get filteredAndSortedFilms() {
    return this._filteredAndSortedFilms;
  }

  _updateFilm(film) {
    const index = this._films.findIndex((item) => item.id === film.id);

    if (index === -1) {
      throw new Error('Can\'t update unexacting task');
    }

    this._films = [
      ...this._films.slice(0, index),
      film,
      ...this._films.slice(index + 1),
    ];
  }

  updateFilms(updateType, update) {
    this._updateFilm(update);
    this._filterFilms();
    this._sortFilms();

    this._notify(updateType, this._filteredAndSortedFilms, update);
  }

  updateFilterFilms(updateType, filterType) {
    this._sortType = SortType.DEFAULT;
    this._filterType = filterType;

    this._filterFilms();
    this._sortFilms();

    this._notify(updateType, this._filteredAndSortedFilms, '');
  }

  updateSortFilms(updateType, sortType) {
    this._sortType = sortType;

    this._sortFilms();

    this._notify(updateType, this._filteredAndSortedFilms, '');
  }

  static adaptToClient(movie) {
    const adaptedMovie = {
      id: movie.id,
      comments: movie.comments,
      poster: movie.film_info.poster,
      title: movie.film_info.title,
      alternativeTitle: movie.film_info.alternative_title,
      director: movie.film_info.director,
      writers: movie.film_info.writers,
      actors: movie.film_info.actors,
      rating: movie.film_info.total_rating,
      productionYear: convertsDate(movie.film_info.release.date, MOVIE_CARD_YEAR_FORMAT),
      productionYearIso: movie.film_info.release.date,
      productionCountry: movie.film_info.release.release_country,
      runtime: movie.film_info.runtime,
      genre: movie.film_info.genre,
      description: movie.film_info.description,
      ageRating: movie.film_info.age_rating,
      watchingDate: movie.user_details.watching_date,
      isWatchList: movie.user_details.watchlist,
      isWatched: movie.user_details.already_watched,
      isFavorite: movie.user_details.favorite,
    };
    return adaptedMovie;
  }

  static adaptToServer(movie) {
    const adaptedMovie = {
      id: movie.id,
      comments: movie.comments,
      film_info: {
        poster: movie.poster,
        title: movie.title,
        alternative_title: movie.alternativeTitle,
        director: movie.director,
        writers: movie.writers,
        actors: movie.actors,
        rating: movie.rating,
        release: {
          date: movie.productionYearIso,
          release_country: movie.productionCountry,
        },
        runtime: movie.runtime,
        genre: movie.genre,
        description: movie.description,
        age_rating: movie.ageRating,
      },
      user_details: {
        already_watched: movie.isWatched,
        favorite: movie.isFavorite,
        watching_date: movie.watchingDate,
        watchlist: movie.isWatchList,
      },
    };
    return adaptedMovie;
  }
}
