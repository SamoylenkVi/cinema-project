import AbstractView from './abstract';

const createLoadingTemplate = () => `
<section class="loader-section">
<p class=loader-text> Loading <span class="loader"></span></p>
</section>`;

export default class Loading extends AbstractView {
  getTemplate() {
    return createLoadingTemplate();
  }
}
