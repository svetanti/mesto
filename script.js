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

//Открыть попап
function opening(btn, popupType) {
  btn.addEventListener('click', function() {
    popupType.classList.add('popup_opened');
  });
}

//Удалить класс
function removeClass(popupType) {
  popupType.classList.remove('popup_opened');
}

//Закрыть попап
function closeByClick(closeBtn, popupType) {
  closeBtn.addEventListener('click', function() {
    removeClass(popupType);
  });
}

//Открыть/закрыть imagePopup
function toggleImagePopup() {
  const zoomPhoto = document.querySelector('.card__container');
  const imagePopup = document.querySelector('.photo');
  const closePhoto = document.querySelector('.photo__close');
  opening(zoomPhoto, imagePopup);
  closeByClick(closePhoto, imagePopup);
}

//Лайк
function likePhoto() {
  const likeButton = document.querySelector('.card__like');
  likeButton.addEventListener('click', function(evt) {
    evt.target.classList.toggle('card__like_active');
  });
}

//Удаление
function deletePhoto() {
  const deleteButton = document.querySelector('.card__delete');
  deleteButton.addEventListener('click', function() {
    const card = deleteButton.closest('.card');
    card.remove();
  });
}

//Добавить карточки
const photoGallery = document.querySelector('.elements');
function addCard (src, name) {
  const cardTemplate = document.querySelector('#cardTemplate').content;
  const cardItem = cardTemplate.cloneNode(true);
  cardItem.querySelector('.card__photo').src = src;
  cardItem.querySelector('.card__photo').alt = name;
  cardItem.querySelector('.card__caption').textContent = name;

  cardItem.querySelector('.photo__img').src = src;
  cardItem.querySelector('.photo__img').alt = name;
  cardItem.querySelector('.photo__caption').textContent = name;

  photoGallery.prepend(cardItem);

  likePhoto();
  deletePhoto();
  toggleImagePopup();
}

//Вывести карточки на страницу
initialCards.forEach(function(item) {
  addCard(item.link, item.name);
});

//Открыть photoPopup
const addPhotoPopup = document.querySelector('#photoPopup');
const addPhoto = document.querySelector('.profile__button_action_add');
function openPhotoPopup() {
  opening(addPhoto, addPhotoPopup);
};

//Открыть userPopup
const userPopup = document.querySelector('#userPopup');
const editUserInfo = document.querySelector('.profile__button_action_edit');
const inputUser = document.querySelector('#userName');
const inputAbout = document.querySelector('#aboutUser');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');

function openUserPopup() {
  opening(editUserInfo, userPopup);
  inputUser.setAttribute('value', profileName.textContent);
  inputAbout.setAttribute('value', profileAbout.textContent);
};

//Открыть/закрыть попап
function togglePopup(popupFunc, popupType) {
  popupFunc();
  const closeButtons = document.querySelectorAll('.popup__button_close');
  closeButtons.forEach(function(item) {
    closeByClick(item, popupType);
  });
}

togglePopup(openUserPopup, userPopup);
togglePopup(openPhotoPopup, addPhotoPopup);

//Submit
function submit(form, submitType) {
  form.addEventListener('submit', submitType);
}

//Submit для пользователя
const formElement = document.querySelector('#userContainer');
function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = inputUser.value;
    profileAbout.textContent = inputAbout.value;
    removeClass(userPopup);
}

submit(formElement, formSubmitHandler);

//Submit для фотографий
const inputName = document.querySelector('#photoName');
const inputLink = document.querySelector('#photoLink');
const photoContainer = document.querySelector('#photoContainer');
function formPhotoAdding (evt) {
    evt.preventDefault();
    addCard(inputLink.value, inputName.value);
    removeClass(addPhotoPopup);
    inputName.value = '';
    inputLink.value = '';
}

submit(photoContainer, formPhotoAdding);
