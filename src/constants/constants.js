import arkhyz from '../images/cards/arkhyz.jpg'

export const initialCards = [
  {
    name: 'Архыз',
    link: arkhyz
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
export const forms = Array.from(document.querySelectorAll('.popup__container'));
export const buttonEditUserInfo = document.querySelector('.profile__button_action_edit');
export const buttonAddPhoto = document.querySelector('.profile__button_action_add');
