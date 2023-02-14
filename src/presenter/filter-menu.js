import SiteMenuView from '../view/menu';
import SortCardMenuView from '../view/sort';

import { renderElement } from '../utils/render';
import {
  RenderPosition,
  SortType,
  UserAction,
  UpdateType,
} from '../constants';
import { dateSort, ratingSort } from '../utils/card';

export default class FilterMenu {
  constructor(filterContainer, filmsModel) {
    this._filmsModel = filmsModel;

    this._currentSortType = this._filmsModel.currentSortType;
    this._currentFilterType = this._filmsModel.currentFilterType;

    this._filterContainer = filterContainer;

    this._sortCardMenu = new SortCardMenuView(this._currentSortType);
    this._filterMenu = new SiteMenuView(this._getFilms());

    this._handleSortMovieCard = this._handleSortMovieCard.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
  }

  _getFilms() {
    switch (this._currentSortType) {
      case (SortType.DATE):
        return this._filmsModel.films.slice().sort(dateSort);
      case (SortType.RATING):
        return this._filmsModel.films.slice().sort(ratingSort);
      default:
        return this._filmsModel.films;
    }
  }

  init() {
    this._renderFilterMenu();
    this._renderSortFilms();
  }

  _handleViewAction(actionType, updateType, update) {
    // eslint-disable-next-line default-case
    switch (actionType) {
      case (UserAction.SORT_FILMS):
        this._filmsModel.sortFilm(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType) {
    // eslint-disable-next-line default-case
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        break;
      case UpdateType.MINOR:
        this._currentSortType = this._filmsModel.currentSortType;
        this._sortCardMenu.rerenderSort(this._currentSortType);
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        break;
    }
  }

  _renderFilterMenu() {
    renderElement(this._filterContainer, this._filterMenu, RenderPosition.AFTERBEGIN);
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
}
