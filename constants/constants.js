export const initialCards = [
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
export const formSelectors = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button_submit',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};
export const photoGallery = document.querySelector('.elements');
export const forms = Array.from(document.querySelectorAll('.popup__container'));
export const userName = document.querySelector('#user-name');
export const userInfo = document.querySelector('#user-info');
export const userPopup = document.querySelector('#user-popup');
export const userForm = document.querySelector('#user-form');
export const buttonEditUserInfo = document.querySelector('.profile__button_action_edit');
export const profileName = document.querySelector('.profile__name');
export const profileAbout = document.querySelector('.profile__about');
export const photoPopup = document.querySelector('#photo-popup');
export const photoForm = document.querySelector('#photo-form');
export const buttonAddPhoto = document.querySelector('.profile__button_action_add');
export const photoName = document.querySelector('#photo-name');
export const photoLink = document.querySelector('#photo-link');
