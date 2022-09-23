const render = (container, template, place) => {
  const renderingHtml = typeof template === 'function' ? template() : template;

  container.insertAdjacentHTML(place, renderingHtml);
};

export default render;
