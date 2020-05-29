//Импортировать классы
import {FormValidator} from './FormValidator.js';
import {Card} from './Card.js';

//Объявить константы
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
const formSelectors = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button_submit',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};
const photoGallery = document.querySelector('.elements');
const forms = Array.from(document.querySelectorAll('.popup__container'));
const userName = document.querySelector('#user-name');
const userInfo = document.querySelector('#user-info');
const userPopup = document.querySelector('#user-popup');
const userForm = document.querySelector('#user-form');
const buttonEditUserInfo = document.querySelector('.profile__button_action_edit');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const photoPopup = document.querySelector('#photo-popup');
const photoForm = document.querySelector('#photo-form');
const buttonAddPhoto = document.querySelector('.profile__button_action_add');
const photoName = document.querySelector('#photo-name');
const photoLink = document.querySelector('#photo-link');

//Вставить карточку в галерею
const prependCard = (cardItem) => {
  const card = new Card(cardItem, '#card-template');
  const cardElement = card.generateCard();
  photoGallery.prepend(cardElement);
}

//Вывести карточки на страницу
initialCards.reverse().forEach((item) => {
  prependCard(item);
});

//Поменять класс
const toggleModalWindow = (popup) => {
  popup.classList.toggle('popup_opened');
};

//Закрыть любой попап по ESC
const handleKeyClosePopup = (evt) => {
  const popupOpened = document.querySelector('.popup_opened');
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    toggleModalWindow(popupOpened);
    removeKeyCloseEventListener();
  }
};

//Закрыть любой попап по клику
const setMouseClosePopupHandler = (popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.matches('.button_close') || evt.target.matches('.popup')) {
      toggleModalWindow(popup);
    }
  });
};

//Повесить слушатель для закрытия попапа по ESC
const addKeyCloseEventListener = () => {
  document.addEventListener('keyup', handleKeyClosePopup);
};

//Удалить слушатель для закрытия попапа по ESC
const removeKeyCloseEventListener = () => {
  if (!document.querySelector('.popup_opened')) {
    document.removeEventListener('keyup', handleKeyClosePopup);
  }
};

//Открыть/закрыть любой попап
const setTogglePopupHandlers = (setOpenPopupHandler, popup) => {
  setOpenPopupHandler();
  setMouseClosePopupHandler(popup);
};

//Задать значения полей при открытии userForm по умолчанию
const setDefaultInputValue = () => {
  userName.value = profileName.textContent;
  userInfo.value = profileAbout.textContent;
};

//Убрать сообщения об ошибках при открытии окна
const setDefaultErrorState = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  inputList.forEach((inputElement) => {
    if (inputElement.matches('.popup__input_type_error')) {
      const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
      inputElement.classList.remove('popup__input_type_error');
      errorElement.classList.remove('popup__input-error_active');
      errorElement.textContent = '';
    }
  });
};

//Изменить состояние кнопки
const setButtonState = (buttonElement, flag) => {
  if (flag === true) {
    buttonElement.setAttribute('disabled', true);
  }
  else {
    buttonElement.disabled = false;
  }
}

//Открыть userPopup
function setOpenUserPopupHandler() {
  buttonEditUserInfo.addEventListener('click', () => {
    const buttonSubmit = userForm.querySelector('.popup__button_submit');
    setButtonState(buttonSubmit, true);
    setDefaultInputValue();
    setDefaultErrorState(userForm);
    toggleModalWindow(userPopup);
    addKeyCloseEventListener();
  });
}

//Очистить значения полей photoPopup
const resetInputValue = () => {
  photoName.value = '';
  photoLink.value = '';
};

//Открыть photoPopup
function setOpenPhotoPopupHandler() {
  buttonAddPhoto.addEventListener('click', () => {
    const buttonSubmit = photoForm.querySelector('.popup__button_submit');
    setButtonState(buttonSubmit, true);
    resetInputValue();
    setDefaultErrorState(photoForm);
    toggleModalWindow(photoPopup);
    addKeyCloseEventListener();
  });
}

//Отправить данные на страницу
const setSubmitHandler = (formElement, submitForm) => {
  formElement.addEventListener('submit', submitForm);
};

//Submit для пользователя
function handleUserFormSubmit() {
  profileName.textContent = userName.value;
  profileAbout.textContent = userInfo.value;
  toggleModalWindow(userPopup);
  removeKeyCloseEventListener();
}

//Submit для фотографий
function handlePhotoFormSubmit() {
  const cardAddedByUser = {
    name: photoName.value,
    link: photoLink.value
  };
  prependCard(cardAddedByUser);
  toggleModalWindow(photoPopup);
  photoName.value = '';
  photoLink.value = '';
  removeKeyCloseEventListener();
}

//Создать экземпляр класса FormValidator для каждой формы и включить валидацию
forms.forEach((formItem) => {
  const validator = new FormValidator(formSelectors, formItem);
  validator.enableValidation();
});

setTogglePopupHandlers(setOpenUserPopupHandler, userPopup);
setTogglePopupHandlers(setOpenPhotoPopupHandler, photoPopup);
setSubmitHandler(userForm, handleUserFormSubmit);
setSubmitHandler(photoForm, handlePhotoFormSubmit);
