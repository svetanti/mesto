import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popup.querySelector('.popup__container');
  }

  _setEventListeners() {
    super._setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }

  _getInputValues() {
    this._inputList = this._formElement.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;

      return this._formValues;
    });
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}

