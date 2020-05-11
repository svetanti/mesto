//Показать ошибку в поле ввода
const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.classList.add(errorClass);
  errorElement.textContent = errorMessage;
};

//Спрятать ошибку в поле ввода
const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

//Найти невалидное поле
const findInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const setButtonState = (buttonElement, inactiveButtonClass, state) => {
  if (state === true) {
    buttonElement.classList.remove(inactiveButtonClass);
  }
  else {
    buttonElement.classList.add(inactiveButtonClass);
  }
}

//Переключить состояние кнопки
const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (findInvalidInput(inputList)) {
    setButtonState(buttonElement, inactiveButtonClass, false);
  }
  else {
    setButtonState(buttonElement, inactiveButtonClass, true);
  }
};

//Проверить валидность поля
const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
  }
  else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
};

//Повесить слушатели
const setEventListeners = (formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};

//Объявить функицю валидации
const enableValidation = ({...parameters}) => {

  const formSelector = parameters.formSelector;
  const inputSelector = parameters.inputSelector;
  const submitButtonSelector = parameters.submitButtonSelector;
  const inactiveButtonClass = parameters.inactiveButtonClass;
  const inputErrorClass = parameters.inputErrorClass;
  const errorClass = parameters.errorClass;

  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass);
  });
};

//Вызвать функцию валидации
enableValidation({
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button_submit',
  inactiveButtonClass: 'popup__button_submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
});
