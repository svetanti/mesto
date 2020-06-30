export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(this._popupSelector);
    this._escCloseHandler = (evt) => this._handleEscClose(evt);
  }

  //Открыть попап
  open() {
    this._popup.classList.add('popup_opened');
    this._setEventListeners();
  }

  //Закрыть попап
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keyup', this._escCloseHandler);
  }

  //Закрыть по ESC
  _handleEscClose(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      this.close();
    }
  }

  //Установить слушатели событий
  _setEventListeners() {
    this._popup.addEventListener('click', (evt) => {
      if (evt.target.matches('.button_close') || evt.target.matches('.popup')) {
        this.close();
      }
    });
    document.addEventListener('keyup', this._escCloseHandler);
  }
}
