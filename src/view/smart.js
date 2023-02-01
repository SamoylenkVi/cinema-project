import Abstract from './abstract';

export default class Smart extends Abstract {
  restoreHandlers() {
    throw new Error('Smart method not implemented: restoreHandlers');
  }

  updateElement() {
    const prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, prevElement);

    this.restoreHandlers();
    newElement.scrollTo(0, newElement.scrollHeight);
  }

  updateData(update, justUpdateElement) {
    if (!update) {
      return;
    }

    this._filmCardState = {
      ...this._filmCardState,
      ...update,
    };

    if (justUpdateElement) {
      return;
    }

    this.updateElement();
  }
}
