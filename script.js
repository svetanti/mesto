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

//Добавить разметку карточки
const cardTemplate = document.querySelector('#card-template').content;

const addCard = (src, name) => {
  const cardItem = cardTemplate.cloneNode(true);
  cardItem.querySelector('.card__photo').src = src;
  cardItem.querySelector('.card__photo').alt = name;
  cardItem.querySelector('.card__caption').textContent = name;

  return cardItem;
};

//Вставить карточку в галерею
const photoGallery = document.querySelector('.elements');

const insertCard = (card) => {
  const photoCard = addCard(card.link, card.name);
  photoGallery.prepend(photoCard);
};

//Вывести карточки на страницу
initialCards.forEach((item) => {
  insertCard(item);
});

//Лайк
const cardList = document.querySelector('.elements');

const likePhoto = (evt) => {
  if (!evt.target.matches('.card__like')) {
    return;
  }
  else {
    evt.target.classList.toggle('card__like_active');
  }
};

cardList.addEventListener('click', likePhoto);

//Удаление
const deletePhoto = (evt) => {
  if (!evt.target.matches('.card__delete')) {
    return;
  }
  else {
    const cardToDelete = evt.target.closest('.card');
    cardToDelete.remove();
  }
};

cardList.addEventListener('click', deletePhoto);

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

//Повесить слушатель для закрытия попапа по ESC
const addKeyCloseEventListener = () => {
  document.addEventListener('keyup', setKeyClosePopupHandler);
};

//Закрыть любой попап по клику
const setMouseClosePopupHandler = (popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.matches('.button_close') || evt.target.matches('.popup')) {
      toggleModalWindow(popup);
    }
  });
};

//Открыть/закрыть любой попап
const setTogglePopupHandlers = (setOpenPopupHandler, popup) => {
  setOpenPopupHandler();
  setMouseClosePopupHandler(popup);
};

//Открыть imagePopup
const imagePopup = document.querySelector('#image-popup');
const photoBig = imagePopup.querySelector('.photo__img');
const photoBigCaption = imagePopup.querySelector('.photo__caption');

function setOpenImagePopupHandler() {
  cardList.addEventListener('click', (evt) => {
    if (!evt.target.matches('.card__photo')) {
      return;
    }
    else {
      const imageToZoom = evt.target;
      const imageContainer = imageToZoom.parentElement;
      const caption = imageContainer.nextElementSibling;
      photoBig.src = imageToZoom.src;
      photoBig.alt = caption.textContent;
      photoBigCaption.textContent = caption.textContent;
      toggleModalWindow(imagePopup);
      addKeyCloseEventListener();
    }
  });
};

setTogglePopupHandlers(setOpenImagePopupHandler, imagePopup);

//Задать значения полей при открытии по умолчанию
const setDefaultInputValue = (formElement, firstDefaultValue, secondDefaultValue) => {
  const inputList = Array.from(formElement.querySelectorAll(`.popup__input`));
  inputList[0].value = firstDefaultValue;
  inputList[1].value = secondDefaultValue;
};

//Убрать сообщения об ошибках при открытии окна
const setDefaultErrorState = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  inputList.forEach((inputElement) => {
    if (inputElement.matches('.popup__input_type_error')) {
      hideInputError(formElement, inputElement, 'popup__input_type_error', 'popup__input-error_active');
    };
  });
};

//Открыть userPopup
const userPopup = document.querySelector('#user-popup');
const userForm = document.querySelector('#user-form');
const buttonEditUserInfo = document.querySelector('.profile__button_action_edit');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');

function setOpenUserPopupPopupHandler() {
  buttonEditUserInfo.addEventListener('click', () => {
    setDefaultInputValue(userForm, profileName.textContent, profileAbout.textContent);
    setDefaultErrorState(userForm);
    toggleModalWindow(userPopup);
    addKeyCloseEventListener();
  });
};

setTogglePopupHandlers(setOpenUserPopupPopupHandler, userPopup);

//Открыть photoPopup
const photoPopup = document.querySelector('#photo-popup');
const photoForm = document.querySelector('#photo-form');
const buttonAddPhoto = document.querySelector('.profile__button_action_add');
const photoName = document.querySelector('#photo-name');
const photoLink = document.querySelector('#photo-link');

function setOpenPhotoPopupPopupHandler() {
  buttonAddPhoto.addEventListener('click', () => {
    setDefaultInputValue(photoForm, '', '');
    setDefaultErrorState(photoForm);
    toggleModalWindow(photoPopup);
    addKeyCloseEventListener();
  });
};

setTogglePopupHandlers(setOpenPhotoPopupPopupHandler, photoPopup);

//Отправить данные на страницу
const setSubmitHandler = (formElement, submitForm) =>
formElement.addEventListener('click', (evt) => {
  if (evt.target.matches('.popup__button_submit') && !evt.target.matches('.popup__button_submit_disabled')) {
    submitForm();
  }
});

//Submit для пользователя
const userName = document.querySelector('#user-name');
const userInfo = document.querySelector('#user-info');
function setSubmitUserFormHandler() {
    profileName.textContent = userName.value;
    profileAbout.textContent = userInfo.value;
    toggleModalWindow(userPopup);
};

setSubmitHandler(userForm, setSubmitUserFormHandler);

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
;}

setSubmitHandler(photoForm, setSubmitPhotoFormHandler);
