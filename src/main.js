import UserProfileView from './view/user-profile';
import PagePresenter from './presenter/page';
import { renderElement } from './utils/render';
import { generateCardFilm } from './mock/card-film';
import FilmsModel from './model/films';
import CommentsModel from './model/comments';
import { FILM_COUNT, RenderPosition } from './constants';
import allComments from './mock/film-comments';

const filmCards = Array.from({ length: FILM_COUNT }, (_, index) => generateCardFilm(index));

const filmsModel = new FilmsModel();
filmsModel.films = filmCards;

const commentsModel = new CommentsModel();
commentsModel.comments = allComments;

const headerElement = document.querySelector('.header');

renderElement(headerElement, new UserProfileView(), RenderPosition.BEFOREEND);

const pagePresenter = new PagePresenter(filmsModel, commentsModel);
pagePresenter.init();
