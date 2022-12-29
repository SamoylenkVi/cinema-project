import AbstractView from './abstract';

const createShowMoreButton = () => `
<button class="films-list__show-more">Show more</button>`;

export default class ShowMoreButton extends AbstractView {
  getTemplate() {
    return createShowMoreButton();
  }
}
