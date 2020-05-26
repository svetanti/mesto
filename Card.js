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
const photoGallery = document.querySelector('.elements');
const imagePopup = document.querySelector('#image-popup');
const photoBig = imagePopup.querySelector('.photo__img');
const photoBigCaption = imagePopup.querySelector('.photo__caption');

class Card {
  constructor(data, cardSelector) {
    this._cardSelector = cardSelector;
    this._name = data.name;
    this._link = data.link;
  }

  _getCardTemplate() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.card')
    .cloneNode(true);

    this._cardItem = cardElement;

    return cardElement;
  }

  generateCard() {
    this._cardItem = this._getCardTemplate();
    this._setEventListeners();

    this._cardItem.querySelector('.card__photo').src = this._link;
    this._cardItem.querySelector('.card__photo').alt = this._name;
    this._cardItem.querySelector('.card__caption').textContent = this._name;

    return this._cardItem;
  }

  _setEventListeners() {
    this._cardItem.querySelector('.card__like').addEventListener('click', () => {
      this._handleCardLike();
    });
    this._cardItem.querySelector('.card__delete').addEventListener('click', (evt) => {
      this._handleCardDelete(evt);
    });
    this._cardItem.querySelector('.card__photo').addEventListener('click', (evt) => {
      this._handleCardPopupOpen(evt);
    });
    imagePopup.addEventListener('click', (evt) => {
      this._handleCardPopupClose(evt);
    });
  }

  _handleCardLike() {
    this._cardItem.querySelector('.card__like').classList.toggle('card__like_active');
  }

  _handleCardDelete(evt) {
    const cardToDelete = evt.target.closest('.card');
    cardToDelete.remove();
  }

  _handleCardPopupOpen(evt) {
    const imageToZoom = evt.target;
    photoBig.src = imageToZoom.src;
    photoBig.alt = imageToZoom.alt;
    photoBigCaption.textContent = imageToZoom.alt;
    imagePopup.classList.add('popup_opened');
  }

  _handleCardPopupClose(evt) {
    if (evt.target.matches('.button_close') || evt.target.matches('.popup')) {
      imagePopup.classList.remove('popup_opened');
    };
    addKeyCloseEventListener();
  }
}

const insertCard = (cardItem) => {
  const card = new Card(cardItem, '#card-template');
  const cardElement = card.generateCard();
  photoGallery.prepend(cardElement);
}

initialCards.forEach((item) => {
  insertCard(item);
});
