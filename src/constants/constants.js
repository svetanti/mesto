export const apiOptions = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-12/',
  headers: {
    authorization: 'b40f325a-73c8-493d-8833-d885268eb953',
    'Content-Type': 'application/json',
  },
};

export const formSelectors = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button_submit',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
};
export const userForm = document.querySelector('#user-form');
export const photoForm = document.querySelector('#photo-form');
export const avatarForm = document.querySelector('#avatar-form');
export const buttonEditUserInfo = document.querySelector(
  '.profile__button_action_edit'
);
export const buttonAddPhoto = document.querySelector(
  '.profile__button_action_add'
);
export const buttonChangeAvatar = document.querySelector(
  '.profile__button_action_avatar-change'
);
