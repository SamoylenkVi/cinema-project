import UserProfileView from './view/user-profile';
import SiteMenuView from './view/menu';
import GenericMovieWrapperView from './view/all-movie-wrapper';
import SortCardMenuView from './view/sort';
import {
  renderElement, RenderPosition,
} from './utils/render';
import { generateCardFilm } from './mock/card-film';
import { FILM_COUNT } from './constants';
import MovieListPresenter from './presenter/movie-wrapper';

const MAIN_FILMS_TITLE = 'All movies. Upcoming';
const MAIN_FILMS_WRAPPER = 'films-list';

const FILMS_LIST_ATTRIBUTE = {
  MAIN: 'Main',
  TOP_RATED: 'Top rated',
  MOST_COMMENTED: 'Most commented',
};

const filmCards = new Array(FILM_COUNT)
  .fill()
  .map((element, idElement) => generateCardFilm(idElement));

const mainElement = document.querySelector('.main');
const headerElement = document.querySelector('.header');

renderElement(headerElement, new UserProfileView(), RenderPosition.BEFOREEND);
renderElement(mainElement, new SiteMenuView(filmCards), RenderPosition.AFTERBEGIN);
renderElement(mainElement, new SortCardMenuView(), RenderPosition.BEFOREEND);
renderElement(mainElement, new GenericMovieWrapperView(), RenderPosition.BEFOREEND);

const allMovieWrapper = mainElement.querySelector('.films');

const moviePresenter = new MovieListPresenter(
  allMovieWrapper,
  MAIN_FILMS_WRAPPER,
  MAIN_FILMS_TITLE,
  FILMS_LIST_ATTRIBUTE.MAIN,
);

moviePresenter.init(filmCards);
