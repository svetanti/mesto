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
function addCard(src, name) {
  const cardItem = cardTemplate.cloneNode(true);
  cardItem.querySelector('.card__photo').src = src;
  cardItem.querySelector('.card__photo').alt = name;
  cardItem.querySelector('.card__caption').textContent = name;

  return cardItem;
}

//Вставить карточку в галерею
const photoGallery = document.querySelector('.elements');
function insertCard(card) {
  const photoCard = addCard(card.link, card.name);
  photoGallery.prepend(photoCard);
}

//Вывести карточки на страницу
initialCards.forEach(function(item) {
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
}

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
}

cardList.addEventListener('click', deletePhoto);

//Поменять класс
const toggleModalWindow = (popup) => {
  popup.classList.toggle('popup_opened');
}

//Закрыть любой попап по ESC
const setKeyClosePopupHandler = (popup) => {
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      popup.classList.remove('popup_opened');
    }
  });
}

//Закрыть любой попап по клику
const setMouseClosePopupHandler = (popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.matches('.button_close') || evt.target.matches('.popup')) {
      toggleModalWindow(popup);
    }
  });
}

//Открыть/закрыть любой попап
function setTogglePopupHandlers(setOpenPopupHandler, popup) {
  setOpenPopupHandler();
  setKeyClosePopupHandler(popup);
  setMouseClosePopupHandler(popup);
}

//Открыть imagePopup
const imagePopup = document.querySelector('#image-popup');
const photoBig = imagePopup.querySelector('.photo__img');
const photoBigCaption = imagePopup.querySelector('.photo__caption');
function setOpenImagePopupHandler() {
  cardList.addEventListener('click', function(evt) {
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
    }
  });
}

setTogglePopupHandlers(setOpenImagePopupHandler, imagePopup);

//Открыть userForm
const userForm = document.querySelector('#user-popup');
const buttonEditUserInfo = document.querySelector('.profile__button_action_edit');
const userName = document.querySelector('#user-name');
const userInfo = document.querySelector('#user-info');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
function setOpenUserFormPopupHandler() {
  buttonEditUserInfo.addEventListener('click', function() {
    toggleModalWindow(userForm);
    userName.value = profileName.textContent;
    userInfo.value = profileAbout.textContent;
  });
};

setTogglePopupHandlers(setOpenUserFormPopupHandler, userForm);

//Открыть photoForm
const photoForm = document.querySelector('#photo-popup');
const buttonAddPhoto = document.querySelector('.profile__button_action_add');
function setOpenPhotoFormPopupHandler() {
  buttonAddPhoto.addEventListener('click', function() {
    toggleModalWindow(photoForm);
  });
};

setTogglePopupHandlers(setOpenPhotoFormPopupHandler, photoForm);

//Submit
function setSubmitHandler(form, submitHandler) {
  form.addEventListener('submit', submitHandler);
}

//Submit для пользователя
const userContainer = document.querySelector('#user-container');
function submitUserForm (evt) {
    evt.preventDefault();
    profileName.textContent = userName.value;
    profileAbout.textContent = userInfo.value;
    toggleModalWindow(userForm);
}

setSubmitHandler(userContainer, submitUserForm);

//Submit для фотографий
const photoName = document.querySelector('#photo-name');
const photoLink = document.querySelector('#photo-link');
const photoContainer = document.querySelector('#photo-container');
function submitPhotoForm (evt) {
    evt.preventDefault();
    const cardAddedByUser = {
      name: photoName.value,
      link: photoLink.value
    };
    insertCard(cardAddedByUser);
    toggleModalWindow(photoForm);
    photoName.value = '';
    photoLink.value = '';
}

setSubmitHandler(photoContainer, submitPhotoForm);
