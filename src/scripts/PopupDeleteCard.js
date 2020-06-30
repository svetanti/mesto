import Popup from './Popup.js';

export default class PopupDeleteCard extends Popup {
  constructor(popupSelector, api, card) {
    super(popupSelector);
    this._formElement = this._popup.querySelector('.popup__container');
    this._api = api;
    this._card = card;
  }

  //Установить слушатели событий
  _setEventListeners() {
    super._setEventListeners();
    const deleteHandler = (evt) => {
      evt.preventDefault();
      this._api.then(() => {
        document.getElementById(this._card._id).remove();
      });

      this._formElement.removeEventListener('submit', deleteHandler);
      this.close();
    };
    this._formElement.addEventListener('submit', deleteHandler);
  }
}
