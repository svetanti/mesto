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
const cardTemplate = document.querySelector('#card-template').content;
const photoGallery = document.querySelector('.elements');
const cardList = document.querySelector('.elements');
const imagePopup = document.querySelector('#image-popup');
const photoBig = imagePopup.querySelector('.photo__img');
const photoBigCaption = imagePopup.querySelector('.photo__caption');
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

//Добавить разметку карточки
const addCard = (src, name) => {
  const cardItem = cardTemplate.cloneNode(true);
  cardItem.querySelector('.card__photo').src = src;
  cardItem.querySelector('.card__photo').alt = name;
  cardItem.querySelector('.card__caption').textContent = name;

  return cardItem;
};

//Вставить карточку в галерею
const insertCard = (card) => {
  const photoCard = addCard(card.link, card.name);
  photoGallery.prepend(photoCard);
};

//Вывести карточки на страницу
initialCards.forEach((item) => {
  insertCard(item);
});

//Лайк
const likePhoto = (evt) => {
  if (evt.target.matches('.card__like')) {
    evt.target.classList.toggle('card__like_active');
  }
};

//Удаление
const deletePhoto = (evt) => {
  if (evt.target.matches('.card__delete')) {
    const cardToDelete = evt.target.closest('.card');
    cardToDelete.remove();
  }
};

//Поменять класс
const toggleModalWindow = (popup) => {
  popup.classList.toggle('popup_opened');
};

//Закрыть любой попап по ESC
const setKeyClosePopupHandler = (evt) =>{
  const popupOpened = document.querySelector('.popup_opened');
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    toggleModalWindow(popupOpened);
    document.removeEventListener('keyup', setKeyClosePopupHandler);
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
  document.addEventListener('keyup', setKeyClosePopupHandler);
};

//Открыть/закрыть любой попап
const setTogglePopupHandlers = (setOpenPopupHandler, popup) => {
  setOpenPopupHandler();
  setMouseClosePopupHandler(popup);
};

//Открыть imagePopup
function setOpenImagePopupHandler() {
  cardList.addEventListener('click', (evt) => {
    if (!evt.target.matches('.card__photo')) return;
    const imageToZoom = evt.target;
    photoBig.src = imageToZoom.src;
    photoBig.alt = imageToZoom.alt;
    photoBigCaption.textContent = imageToZoom.alt;
    toggleModalWindow(imagePopup);
    addKeyCloseEventListener();
  });
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
      hideInputError(formElement, inputElement, {inputErrorClass: 'popup__input_type_error', errorClass: 'popup__input-error_active'});
    };
  });
};

//Открыть userPopup
function setOpenUserPopupPopupHandler() {
  buttonEditUserInfo.addEventListener('click', () => {
    const buttonSubmit = userForm.querySelector('.popup__button_submit');
    setButtonState(buttonSubmit, true);
    setDefaultInputValue();
    setDefaultErrorState(userForm);
    toggleModalWindow(userPopup);
    addKeyCloseEventListener();
  });
};

//Очистить значения полей photoPopup
const resetInputValue = () => {
  photoName.value = '';
  photoLink.value = '';
};

//Открыть photoPopup
function setOpenPhotoPopupPopupHandler() {
  buttonAddPhoto.addEventListener('click', () => {
    const buttonSubmit = photoForm.querySelector('.popup__button_submit');
    setButtonState(buttonSubmit, true);
    resetInputValue();
    setDefaultErrorState(photoForm);
    toggleModalWindow(photoPopup);
    addKeyCloseEventListener();
  });
};

//Отправить данные на страницу
const setSubmitHandler = (formElement, submitForm) => {
  formElement.addEventListener('submit', submitForm);
};

//Submit для пользователя
function setSubmitUserFormHandler() {
  profileName.textContent = userName.value;
  profileAbout.textContent = userInfo.value;
  toggleModalWindow(userPopup);
};

//Submit для фотографий
function setSubmitPhotoFormHandler(evt) {
  const cardAddedByUser = {
    name: photoName.value,
    link: photoLink.value
  };
  insertCard(cardAddedByUser);
  toggleModalWindow(photoPopup);
  photoName.value = '';
  photoLink.value = '';
};

cardList.addEventListener('click', likePhoto);
cardList.addEventListener('click', deletePhoto);

setTogglePopupHandlers(setOpenImagePopupHandler, imagePopup);
setTogglePopupHandlers(setOpenUserPopupPopupHandler, userPopup);
setTogglePopupHandlers(setOpenPhotoPopupPopupHandler, photoPopup);
setSubmitHandler(userForm, setSubmitUserFormHandler);
setSubmitHandler(photoForm, setSubmitPhotoFormHandler);
