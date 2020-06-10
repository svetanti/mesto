//Импортировать классы
import FormValidator from './FormValidator.js';
import Card from './Card.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';
import Section from './Section.js';

import { initialCards, formSelectors, photoGallery, buttonEditUserInfo } from '../constants/constants.js';

//Объявить константы
const forms = Array.from(document.querySelectorAll('.popup__container'));
const photoPopup = document.querySelector('#photo-popup');
const photoForm = document.querySelector('#photo-form');
const buttonAddPhoto = document.querySelector('.profile__button_action_add');
const photoName = document.querySelector('#photo-name');
const photoLink = document.querySelector('#photo-link');

//Создать экземпляра класса PopupWithImage
const popupWithImage = new PopupWithImage('#image-popup');

//Создать экземпляр класса Section для карточек
const cardList = new Section({
  data: initialCards,
  renderer: (cardItem) => {
    const card = new Card(cardItem,
    {
    cardSelector: '#card-template',
    handleCardClick: () => {
      photoGallery.addEventListener('click', (evt) => {
        if (evt.target.matches('.card__photo')) {
          popupWithImage.open(evt);
        }
      });
    }
  });
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  }
}, '.elements');

//Отрисовать карточки
cardList.renderItems();

//Создать экземпляр класса UserInfo
const userInformation = new UserInfo({
  userNameSelector: '.profile__name',
  userInfoSelector: '.profile__about'
});

//Работает, но нет блокировки кнопки при повторном открытии
const popupWithUserForm = new PopupWithForm(
  '#user-popup',
  { handleFormSubmit: (userItems) => {
      userInformation.setUserInfo(userItems);
      popupWithUserForm.close();
    },
    getProfileInfo: () => {
      return userInformation.getUserInfo();
    }
  });

//Открыть userPopup
buttonEditUserInfo.addEventListener('click', () => {
  popupWithUserForm.open();
});

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
