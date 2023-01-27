import UserProfileView from './view/user-profile';
import SiteMenuView from './view/menu';
import PagePresenter from './presenter/page';
import { renderElement } from './utils/render';
import { generateCardFilm } from './mock/card-film';
import { FILM_COUNT, RenderPosition } from './constants';

const filmCards = new Array(FILM_COUNT)
  .fill()
  .map((element, idElement) => generateCardFilm(idElement));

const mainElement = document.querySelector('.main');
const headerElement = document.querySelector('.header');

renderElement(headerElement, new UserProfileView(), RenderPosition.BEFOREEND);
renderElement(mainElement, new SiteMenuView(filmCards), RenderPosition.AFTERBEGIN);

const pagePresenter = new PagePresenter();
pagePresenter.init(filmCards);
