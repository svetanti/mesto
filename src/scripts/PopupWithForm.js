import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, validator, { handleFormSubmit, setInputValues }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._setInputValues = setInputValues;
    this._validator = validator;
    this._formElement = this._popup.querySelector('.popup__container');
    this._inputList = this._formElement.querySelectorAll('.popup__input');
    this._buttonSubmit = this._formElement.querySelector(
      '.popup__button_submit'
    );
    this._buttonText = this._buttonSubmit.textContent;
  }

  //Открыть попап
  open() {
    super.open();
    this._setInputValues();
    this._validator.enableValidation();
    this._validator.setDefaultErrorState();
    this._validator.setInitialButtonState(true);
  }

  //Установить слушатели событий
  _setEventListeners() {
    super._setEventListeners();
    const submitHandler = (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
      this._formElement.removeEventListener('submit', submitHandler);
    };
    this._formElement.addEventListener('submit', submitHandler);
  }

  //Получить значения полей ввода
  getInputValues() {
    this._formValues = {};
    this._inputList.forEach(
      (inputElement) =>
        (this._formValues[inputElement.name] = inputElement.value)
    );

    return this._formValues;
  }

  //Отобразить состояние загрузки
  renderLoading(isLoading) {
    if (isLoading) {
      this._buttonSubmit.classList.add('popup__button_submit_loading');
      this._buttonSubmit.textContent = `Сохранение...`;
    } else {
      this._buttonSubmit.classList.remove('popup__button_submit_loading');
      this._buttonSubmit.textContent = this._buttonText;
    }
  }

  //Закрыть попап
  close() {
    super.close();
    this._formElement.reset();
  }
}
