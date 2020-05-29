export class FormValidator {
  constructor(data, formElement) {
    this._formElement = formElement;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
  }

  //Определить элемент с текстом ошибки
  _setErrorElement(inputElement) {
    return this._formElement.querySelector(`#${inputElement.id}-error`);
  }

  //Показать ошибку в поле ввода
  _showInputError (inputElement, errorMessage) {
    inputElement.classList.add(this._inputErrorClass);
    this._setErrorElement(inputElement).classList.add(this._errorClass);
    this._setErrorElement(inputElement).textContent = errorMessage;
  };

  //Спрятать ошибку в поле ввода
  _hideInputError (inputElement) {
    inputElement.classList.remove(this._inputErrorClass);
    this._setErrorElement(inputElement).classList.remove(this._errorClass);
    this._setErrorElement(inputElement).textContent = '';
  };

  //Найти невалидное поле
  _findInvalidInput (inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  //Установить состояние кнопки
  _setButtonState (buttonElement, flag) {
    if (flag === true) {
      buttonElement.setAttribute('disabled', true);
    }
    else {
      buttonElement.disabled = false;
    }
  };

  //Переключить состояние кнопки
  _toggleButtonState (inputList, buttonElement) {
    this._setButtonState (buttonElement, this._findInvalidInput(inputList));
  };


  //Проверить валидность поля
  _checkInputValidity (inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    }
    else {
      this._hideInputError(inputElement);
    }
  };

  //Повесить слушатели
  _setEventListeners () {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  };

  //Объявить функицю валидации
  enableValidation () {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  };
}
