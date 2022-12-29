import AbstractView from './abstract';

const messageTemplate = () => `
<section class="films-list">
<h2 class="films-list__title">There are no movies in our database</h2>
</section>`;

export default class EmptyFilmMessage extends AbstractView {
  getTemplate() {
    return messageTemplate();
  }
}
