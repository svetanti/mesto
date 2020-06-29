//Импорты
import './index.css';
import FormValidator from '../scripts/FormValidator.js';
import Card from '../scripts/Card.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import popupDeleteCard from '../scripts/PopupDeleteCard.js';
import UserInfo from '../scripts/UserInfo.js';
import Section from '../scripts/Section.js';
import { api } from '../scripts/Api.js';

import {
  formSelectors,
  forms,
  buttonEditUserInfo,
  buttonAddPhoto,
  buttonChangeAvatar,
} from '../constants/constants.js';

//Создать экземпляра класса PopupWithImage
const popupWithImage = new PopupWithImage('#image-popup');

//Создать экземпляр класса Section для карточек
const cardList = new Section(
  {
    renderer: (cardItem) => {
      const card = new Card(cardItem, api, {
        cardSelector: '#card-template',
        handleCardClick: (evt) => {
          popupWithImage.open(evt);
        },
        confirmDelete: () => {
          const confirmPopup = new popupDeleteCard(
            '#popup-delete',
            api.deletePhoto(cardItem._id),
            cardItem
          );
          confirmPopup.open();
        },
      });
      api.getUserInfo().then((data) => {
        const cardElement = card.generateCard(data);
        cardList.addItem(cardElement);
      });
    },
  },
  '.elements'
);

//Отрисовать карточки
cardList.renderItems(api.getInitialCards());

//Создать экземпляр класса UserInfo
const userInfo = new UserInfo({
  userNameSelector: '.profile__name',
  userInfoSelector: '.profile__about',
  userAvatarSelector: '.profile__avatar',
});

//Загрузить информацию о пользователе
api.getUserInfo().then((data) => {
  userInfo.setUserInfo(data);
});

//Создать экземпляр класса PopupWithForm для userPopup
const popupWithUserForm = new PopupWithForm('#user-popup', {
  handleFormSubmit: () => {
    popupWithUserForm.renderLoading(true);
    const inputValues = popupWithUserForm.getInputValues();
    api
      .updateUserInfo(inputValues)
      .then((data) => {
        userInfo.setUserInfo(data);
      })
      .finally(() => {
        popupWithUserForm.renderLoading(false);
        popupWithUserForm.close();
      });
  },
  setInputValues: () => {
    const formElement = document.querySelector('#user-form');
    api.getUserInfo().then((data) => {
      formElement.elements.name.value = data.name;
      formElement.elements.about.value = data.about;
    });
  },
});

//Открыть userPopup
buttonEditUserInfo.addEventListener('click', () => {
  popupWithUserForm.open();
});

//Создать экземпляр класса PopupWithForm для avatarPopup
const popupWithAvatarForm = new PopupWithForm('#avatar-popup', {
  handleFormSubmit: () => {
    popupWithAvatarForm.renderLoading(true);
    const inputValues = popupWithAvatarForm.getInputValues();
    api
      .updateUserAvatar(inputValues)
      .then((data) => {
        userInfo.setNewAvatar(data);
      })
      .finally(() => {
        popupWithAvatarForm.renderLoading(false);
        popupWithAvatarForm.close();
      });
  },
  setInputValues: () => {
    const formElement = document.querySelector('#avatar-form');
    formElement.elements.url.value = '';
  },
});

//Открыть userPopup
buttonChangeAvatar.addEventListener('click', () => {
  popupWithAvatarForm.open();
});

//Создать экземпляр класса PopupWithForm для photoPopup
const popupWithPhotoForm = new PopupWithForm('#photo-popup', {
  handleFormSubmit: () => {
    popupWithPhotoForm.renderLoading(true);
    const inputValues = popupWithPhotoForm.getInputValues();
    api
      .addNewCard(inputValues)
      .then((data) => {
        const newCard = new Card(data, api, {
          cardSelector: '#card-template',
          handleCardClick: (evt) => {
            popupWithImage.open(evt);
          },

          confirmDelete: () => {
            const confirmPopup = new popupDeleteCard(
              '#popup-delete',
              api.deletePhoto(data._id),
              data
            );
            confirmPopup.open();
          },
        });
        api.getUserInfo().then((data) => {
          const newCardElement = newCard.generateCard(data);
          cardList.addItem(newCardElement);
        });
      })
      .finally(() => {
        popupWithPhotoForm.renderLoading(false);
        popupWithPhotoForm.close();
      });
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
