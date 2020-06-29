import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit, setInputValues }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._setInputValues = setInputValues;
    this._formElement = this._popup.querySelector('.popup__container');
    this._inputList = this._formElement.querySelectorAll('.popup__input');
    this._buttonSubmit = this._formElement.querySelector(
      '.popup__button_submit'
    );
    this._buttonText = this._buttonSubmit.textContent;
  }

  open() {
    super.open();
    this._setInputValues();
    this._setInitialButtonState(true);
    this._setDefaultErrorState();
  }

  _setInitialButtonState(isDisabled) {
    this._buttonSubmit.disabled = isDisabled;
  }

  _setDefaultErrorState() {
    this._inputList.forEach((inputElement) => {
      if (inputElement.matches('.popup__input_type_error')) {
        const errorElement = this._formElement.querySelector(
          `#${inputElement.id}-error`
        );
        inputElement.classList.remove('popup__input_type_error');
        errorElement.classList.remove('popup__input-error_active');
        errorElement.textContent = '';
      }
    });
  }

  _setEventListeners() {
    super._setEventListeners();
    const submitHandler = (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
      this._formElement.removeEventListener('submit', submitHandler);
    };
    this._formElement.addEventListener('submit', submitHandler);
  }

  getInputValues() {
    this._formValues = {};
    this._inputList.forEach(
      (inputElement) =>
        (this._formValues[inputElement.name] = inputElement.value)
    );

    return this._formValues;
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._buttonSubmit.classList.add('popup__button_submit_loading');
      this._buttonSubmit.textContent = `Сохранение...`
    }
    else {
      this._buttonSubmit.classList.remove('popup__button_submit_loading');
      this._buttonSubmit.textContent = this._buttonText;
    }
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}
