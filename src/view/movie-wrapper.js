const createMovieWrapper = (className, title) => `
<section class="${className}">
  <h2 class="films-list__title visually-hidden">${title}</h2>

  <div class="films-list__container"></div>
</section>`;

export default createMovieWrapper;
