import SiteMenuView from '../view/menu';
import SortCardMenuView from '../view/sort';

import { renderElement } from '../utils/render';
import {
  RenderPosition,
  UserAction,
  UpdateType,
  FilterType,
  FilterMode,
} from '../constants';

export default class FilterMenu {
  constructor(filterContainer, filmsModel, handleStatistic, rerenderStatistic) {
    this._filterContainer = filterContainer;
    this._filmsModel = filmsModel;
    this._handleStatistic = handleStatistic;
    this._rerenderStatistic = rerenderStatistic;
    this._films = this._filmsModel.films;

    this.filterMode = FilterMode.MOVIES;
    this._filteredCount = this._filteredFilm();

    this._currentSortType = this._filmsModel.sortType;
    this._currentFilterType = this._filmsModel.filterType;

    this._sortCardMenu = new SortCardMenuView(this._currentSortType);
    this._filterMenu = new SiteMenuView(this._filteredCount, this._currentFilterType);

    this._handleSortMovieCard = this._handleSortMovieCard.bind(this);
    this._handleFilterMovieCard = this._handleFilterMovieCard.bind(this);

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._filteredFilm();
    this._renderFilterMenu();
    this._renderSortFilms();
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case (UserAction.SORT_FILMS):
        this._filmsModel.updateSortFilms(updateType, update);
        break;
      case (UserAction.FILTER_FILMS):
        this._filmsModel.updateFilterFilms(updateType, update);
        break;
      default:
    }
  }

  _handleModelEvent(updateType) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._films = this._filmsModel.films;
        this._filteredCount = this._filteredFilm();
        this._filterMenu.rerenderFilter(this._filteredCount, this._currentFilterType);
        break;
      case UpdateType.MINOR:
        this._films = this._filmsModel.films;
        this._currentSortType = this._filmsModel.sortType;
        this._sortCardMenu.rerenderSort(this._currentSortType);
        break;
      case UpdateType.MAJOR:
        this._films = this._filmsModel.films;
        this._currentFilterType = this._filmsModel.filterType;
        this._currentSortType = this._filmsModel.sortType;
        if (this.filterMode === FilterMode.STATISTIC) {
          this._handleStatistic();
          this.filterMode = FilterMode.MOVIES;
        }
        this._filterMenu.rerenderFilter(this._filteredCount, this._currentFilterType);
        this._sortCardMenu.rerenderSort(this._currentSortType);
        break;
      case UpdateType.INIT:
        this._films = this._filmsModel.films;
        this._filteredCount = this._filteredFilm();
        this._filterMenu.rerenderFilter(this._filteredCount, this._currentFilterType);
        this._sortCardMenu.rerenderSort(this._currentSortType);
        break;
      default:
    }
  }

  _filteredFilm() {
    const filteredCount = {
      [FilterType.WATCHLIST]: 0,
      [FilterType.HISTORY]: 0,
      [FilterType.FAVORITES]: 0,
    };

    this._films.forEach(((element) => {
      if (element.isFavorite) {
        filteredCount[FilterType.FAVORITES] += 1;
      }
      if (element.isWatchList) {
        filteredCount[FilterType.WATCHLIST] += 1;
      }
      if (element.isWatched) {
        filteredCount[FilterType.HISTORY] += 1;
      }
    }));
    return filteredCount;
  }

  _handleFilterMovieCard(filterType) {
    if (this._currentFilterType === filterType) {
      return;
    }

    if (this._currentFilterType === FilterType.STATISTIC) {
      this._rerenderStatistic();
    }
    this._handleViewAction(UserAction.FILTER_FILMS, UpdateType.MAJOR, filterType);

    this._currentFilterType = filterType;
  }

  _renderFilterMenu() {
    renderElement(this._filterContainer, this._filterMenu, RenderPosition.AFTERBEGIN);

    this._filterMenu.setFilterMovieHandler(this._handleFilterMovieCard);
    this._filterMenu.setShowStatisticHandler(this._handleStatistic);
  }

  _handleSortMovieCard(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._handleViewAction(UserAction.SORT_FILMS, UpdateType.MINOR, sortType);

    this._currentSortType = sortType;
  }

  _renderSortFilms() {
    renderElement(this._filterContainer, this._sortCardMenu, RenderPosition.BEFOREEND);

    this._sortCardMenu.setSortMovieHandler(this._handleSortMovieCard);
  }

  selectStatisticHandler() {
    this.filterMode = FilterMode.STATISTIC;
    this._sortCardMenu.hide();
    this._currentFilterType = FilterType.STATISTIC;
    this._filterMenu.rerenderFilter(this._filteredCount, this._currentFilterType);
  }
}
