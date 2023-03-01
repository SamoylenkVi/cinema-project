import Observer from '../utils/observer';

export default class Comments extends Observer {
  constructor() {
    super();

    this._comments = [];
  }

  set comments(comments) {
    this._comments = {
      ...comments,
    };
  }

  get comments() {
    return this._comments;
  }

  deleteComments(updateType, update) {
    this._comments = {
      ...this._comments,
      ...update,
    };
    this._notify(updateType, this._comments);
  }
}
