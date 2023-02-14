import UserProfileView from './view/user-profile';
import PagePresenter from './presenter/page';
import { renderElement } from './utils/render';
import { generateCardFilm } from './mock/card-film';
import FilmsModel from './model.js/films';
import { FILM_COUNT, RenderPosition } from './constants';

const filmCards = new Array(FILM_COUNT)
  .fill()
  .map((element, idElement) => generateCardFilm(idElement));

const filmsModel = new FilmsModel();
filmsModel.films = filmCards;

const headerElement = document.querySelector('.header');

renderElement(headerElement, new UserProfileView(), RenderPosition.BEFOREEND);

const pagePresenter = new PagePresenter(filmsModel);
pagePresenter.init();
