import UserProfileView from './view/user-profile';
import PagePresenter from './presenter/page';
import { renderElement } from './utils/render';
import { generateCardFilm } from './mock/card-film';
import FilmsModel from './model.js/films';
import CommentsModel from './model.js/comments';
import { FILM_COUNT, RenderPosition } from './constants';
import allComments from './mock/film-comments';

const filmCards = new Array(FILM_COUNT)
  .fill()
  .map((element, idElement) => generateCardFilm(idElement));

const filmsModel = new FilmsModel();
filmsModel.films = filmCards;

const commentsModel = new CommentsModel();
commentsModel.comments = allComments;

const headerElement = document.querySelector('.header');

renderElement(headerElement, new UserProfileView(), RenderPosition.BEFOREEND);

const pagePresenter = new PagePresenter(filmsModel, commentsModel);
pagePresenter.init();
