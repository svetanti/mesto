//Импорты
import './index.css';
import FormValidator from '../scripts/FormValidator.js';
import Card from '../scripts/Card.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import UserInfo from '../scripts/UserInfo.js';
import Section from '../scripts/Section.js';

import {
  initialCards,
  formSelectors,
  forms,
  photoGallery,
  buttonEditUserInfo,
  buttonAddPhoto,
} from '../constants/constants.js';

//Создать экземпляра класса PopupWithImage
const popupWithImage = new PopupWithImage('#image-popup');

//Создать экземпляр класса Section для карточек
const cardList = new Section(
  {
    data: initialCards.reverse(),
    renderer: (cardItem) => {
      const card = new Card(cardItem, {
        cardSelector: '#card-template',
        handleCardClick: () => {
          photoGallery.addEventListener('click', (evt) => {
            if (evt.target.matches('.card__photo')) {
              popupWithImage.open(evt);
            }
          });
        },
      });
      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
    },
  },
  '.elements'
);

//Отрисовать карточки
cardList.renderItems();

//Создать экземпляр класса UserInfo
const userInfo = new UserInfo({
  userNameSelector: '.profile__name',
  userInfoSelector: '.profile__about',
});

//Создать экземпляр класса PopupWithForm для userPopup
const popupWithUserForm = new PopupWithForm('#user-popup', {
  handleFormSubmit: (userData) => {
    userInfo.setUserInfo(userData);
    popupWithUserForm.close();
  },
  setInputValues: () => {
    const formElement = document.querySelector('#user-form');
    formElement.elements.name.value = userInfo.getUserInfo().name;
    formElement.elements.info.value = userInfo.getUserInfo().info;
  },
});

//Открыть userPopup
buttonEditUserInfo.addEventListener('click', () => {
  popupWithUserForm.open();
});

//Создать экземпляр класса PopupWithForm для photoPopup
const popupWithPhotoForm = new PopupWithForm('#photo-popup', {
  handleFormSubmit: (photoData) => {
    const userCard = new Section(
      {
        data: [photoData],
        renderer: (cardItem) => {
          const newCard = new Card(cardItem, {
            cardSelector: '#card-template',
            handleCardClick: () => {
              photoGallery.addEventListener('click', (evt) => {
                if (evt.target.matches('.card__photo')) {
                  popupWithImage.open(evt);
                }
              });
            },
          });
          console.log(newCard);
          const newCardElement = newCard.generateCard();
          userCard.addItem(newCardElement);
        },
      },
      '.elements'
    );

    userCard.renderItems();
    popupWithPhotoForm.close();
  },
  setInputValues: () => {
    const formElement = document.querySelector('#photo-form');
    formElement.elements.name.value = '';
    formElement.elements.link.value = '';
  },
});

//Открыть photoPopup
buttonAddPhoto.addEventListener('click', () => {
  popupWithPhotoForm.open();
});

//Создать экземпляр класса FormValidator для каждой формы и включить валидацию
forms.forEach((formItem) => {
  const validator = new FormValidator(formSelectors, formItem);
  validator.enableValidation();
});
