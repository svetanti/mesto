import Popup from './Popup.js';

export default class PopupDeleteCard extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  _setEventListeners() {
    super._setEventListeners();
    const deleteHandler = (evt) => {
      evt.preventDefault();
      this._handleCardDelete();
      this._formElement.removeEventListener('submit', deleteHandler);
    };
    this._formElement.addEventListener('submit', deleteHandler);
  }
}
