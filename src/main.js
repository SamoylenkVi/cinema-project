import UserProfileView from './view/user-profile';
import PagePresenter from './presenter/page';
import { renderElement } from './utils/render';
import FilmsModel from './model/films';
import CommentsModel from './model/comments';
import { RenderPosition } from './constants';
import Api from './api';

const AUTHORIZATION = 'Basic 1qA2ws3eD4rf5tG';
const END_POINT = 'https://14.ecmascript.pages.academy/cinemaddict';

const api = new Api(END_POINT, AUTHORIZATION);

const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel();

const headerElement = document.querySelector('.header');

renderElement(headerElement, new UserProfileView(), RenderPosition.BEFOREEND);

const pagePresenter = new PagePresenter(filmsModel, commentsModel);
pagePresenter.init();

api.getMovies().then((movies) => {
  filmsModel.films = movies;
});

api.getComments().then((comments) => {
  commentsModel.comments = comments;
});
