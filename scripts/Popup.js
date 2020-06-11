export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(this._popupSelector);
  }

  open() {
    this._popup.classList.add('popup_opened');
    this._setEventListeners();
  }

  close() {
    this._popup.classList.remove('popup_opened');
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      this.close();
    }
  }

  _setEventListeners() {
    this._popup.addEventListener('click', (evt) => {
      if (evt.target.matches('.button_close') || evt.target.matches('.popup')) {
        this.close();
      }
    });
    document.addEventListener('keyup', (evt) => {
      this._handleEscClose(evt);
    });
  }
}
