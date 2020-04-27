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
function likePhoto(evt) {
  if (!evt.target.matches('.card__like')) {
    return;
  }
  else {
    evt.target.classList.toggle('card__like_active');
  }
}

cardList.addEventListener('click', likePhoto);

//Удаление
function deletePhoto(evt) {
  if (!evt.target.matches('.card__delete')) {
    return;
  }
  else {
    const cardToDelete = evt.target.closest('.card');
    cardToDelete.remove();
  }
}

cardList.addEventListener('click', deletePhoto);

//Добавить класс
function addClass(popup) {
  popup.classList.add('popup_opened');
}

//Удалить класс
function removeClass(popup) {
  popup.classList.remove('popup_opened');
}

//Открыть попап
function openPopup(btn, popup) {
  btn.addEventListener('click', function() {
    popup.classList.add('popup_opened');
  });
}

//Закрыть попап
function closeByClick(closeBtn, popup) {
  closeBtn.addEventListener('click', function() {
    removeClass(popup);
  });
}

//Открыть imagePopup
const imagePopup = document.querySelector('#image-popup');
const photoBig = imagePopup.querySelector('.photo__img');
const photoBigCaption = imagePopup.querySelector('.photo__caption');
function openImagePopup() {
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
      addClass(imagePopup);
    }
  });
}

//Открыть/закрыть imagePopup
const photoCloseButtons = document.querySelectorAll('.photo__close');
function toggleImagePopup() {
  openImagePopup();
  photoCloseButtons.forEach(function(item) {
    closeByClick(item, imagePopup);
  });
}

toggleImagePopup();

//Открыть photoForm
const photoForm = document.querySelector('#photo-popup');
const buttonAddPhoto = document.querySelector('.profile__button_action_add');
function openPhotoPopup() {
  openPopup(buttonAddPhoto, photoForm);
};

//Открыть userForm
const userForm = document.querySelector('#user-popup');
const buttonEditUserInfo = document.querySelector('.profile__button_action_edit');
const userName = document.querySelector('#user-name');
const userInfo = document.querySelector('#user-info');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');

function openUserForm() {
  openPopup(buttonEditUserInfo, userForm);
  userName.setAttribute('value', profileName.textContent);
  userInfo.setAttribute('value', profileAbout.textContent);
};

//Открыть/закрыть попап
function togglePopup(popupFunc, popup) {
  popupFunc();
  const closeButtons = document.querySelectorAll('.popup__button_close');
  closeButtons.forEach(function(item) {
    closeByClick(item, popup);
  });
}

togglePopup(openUserForm, userForm);
togglePopup(openPhotoPopup, photoForm);

//Submit
function submit(form, submitType) {
  form.addEventListener('submit', submitType);
}

//Submit для пользователя
const userContainer = document.querySelector('#user-container');
function submitUserForm (evt) {
    evt.preventDefault();
    profileName.textContent = userName.value;
    profileAbout.textContent = userInfo.value;
    removeClass(userForm);
}

submit(userContainer, submitUserForm);

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
    removeClass(photoForm);
    photoName.value = '';
    photoLink.value = '';
}

submit(photoContainer, submitPhotoForm);
