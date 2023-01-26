import Abstract from '../view/abstract';
import { RenderPosition } from '../constants';

export const renderElement = (container, element, place) => {
  let containerElement = container;
  let child = element;

  if (containerElement instanceof Abstract) {
    containerElement = containerElement.getElement();
  }

  if (child instanceof Abstract) {
    child = child.getElement();
  }

  switch (place) {
    case RenderPosition.AFTERBEGIN:
      containerElement.prepend(child);
      break;
    case RenderPosition.BEFOREEND:
      containerElement.append(child);
      break;
    default:
      containerElement.append(child);
      break;
  }
};

export const remove = (element) => {
  let elementToRemove = element;

  if (elementToRemove instanceof Abstract) {
    elementToRemove = elementToRemove.getElement();
  }

  elementToRemove.remove();
};
