const editUserInfo = document.querySelector('.profile__button_action_edit');
const editPhoto = document.querySelector('.profile__button_action_add');
const popup = document.querySelector('.popup');
const closeButton = document.querySelector('.popup__button_close');
const inputUser = document.querySelector('#userName');
const inputAbout = document.querySelector('#aboutUser');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');

const photoGallery = document.querySelector('.elements');

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

function addCard (src, name) {
  const cardTemplate = document.querySelector('#cardTemplate').content;
  const cardItem = cardTemplate.cloneNode(true);

  cardItem.querySelector('.card__photo').src = src;
  cardItem.querySelector('.card__caption').textContent = name;

  photoGallery.prepend(cardItem);
}

initialCards.forEach(function(item, index) {
  addCard(item.link, item.name);
})


const page = document.querySelector('.page');
function popupOpen () {
  const popupTemplate = document.querySelector('#popupTemplate').content;
  const popupItem = popupTemplate.cloneNode(true);

  popupItem.querySelector('.popup__heading').textContent = 'Новое место';
  popupItem.querySelector('.popup__label_photo').for = 'inputPhoto';
  popupItem.querySelector('.popup__label_link').for = 'inputLink';
  popupItem.querySelector('.popup__input-item_photo').id = 'inputPhoto';
  popupItem.querySelector('.popup__input-item_link').id = 'inputLink';
  popupItem.querySelector('.popup__input-item_photo').name = 'inputPhoto';
  popupItem.querySelector('.popup__input-item_link').name = 'inputLink';
  popupItem.querySelector('.popup__input-item_photo').placeholder = 'Название';
  popupItem.querySelector('.popup__input-item_link').placeholder = 'Ссылка на картинку';
  popupItem.querySelector('.pup').placeholder = 'Создать';


  page.append(popupItem);
}

popupOpen ();

const popupTmp = document.querySelector('.popupTmp');

function toggleAddPhoto() {
  editPhoto.addEventListener('click', function() {
    popupTmp.classList.add('popup_opened');
    });
  closeButton.addEventListener('click', function() {
    popupTmp.classList.remove('popup_opened');
    });
}

toggleAddPhoto();

function toggleEditUserInfo() {
  editUserInfo.addEventListener('click', function() {
    popup.classList.add('popup_opened');
    inputUser.setAttribute('value', profileName.textContent);
    inputAbout.setAttribute('value', profileAbout.textContent);
    });
  closeButton.addEventListener('click', function() {
    popup.classList.remove('popup_opened');
    });
}




toggleEditUserInfo();







/*










function togglePopup() {
  editButton.addEventListener('click', function() {
    popup.classList.add('popup_opened');
    inputUser.setAttribute('value', profileName.textContent);
    inputAbout.setAttribute('value', profileAbout.textContent);
    });
  closeButton.addEventListener('click', function() {
    popup.classList.remove('popup_opened');
    });
}

togglePopup();

let formElement = document.querySelector('.popup__container');

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = inputUser.value;
    profileAbout.textContent = inputAbout.value;
    popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler);

*/
