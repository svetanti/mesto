const imagePopup = document.querySelector('#image-popup');
const photoBig = imagePopup.querySelector('.photo__img');
const photoBigCaption = imagePopup.querySelector('.photo__caption');

export class Card {
  constructor(data, cardSelector) {
    this._cardSelector = cardSelector;
    this._name = data.name;
    this._link = data.link;
  }

  //Добавить разметку карточки
  _getCardTemplate() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.card')
    .cloneNode(true);

    this._cardItem = cardElement;

    return cardElement;
  }

  //Сгенерировать карточку
  generateCard() {
    this._cardItem = this._getCardTemplate();
    this._setEventListeners();
    const cardPhoto = this._cardItem.querySelector('.card__photo');
    cardPhoto.src = this._link;
    cardPhoto.alt = this._name;
    this._cardItem.querySelector('.card__caption').textContent = this._name;

    return this._cardItem;
  }

  //Установить слушатели событий
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
    document.addEventListener('keyup', (evt) => {
      this._handleCardPopupCloseByKey(evt);
    });
  }

  //Лайк
  _handleCardLike() {
    this._cardItem.querySelector('.card__like').classList.toggle('card__like_active');
  }

  //Удаление
  _handleCardDelete(evt) {
    const cardToDelete = evt.target.closest('.card');
    cardToDelete.remove();
  }

  //Открыть большое изображение
  _handleCardPopupOpen(evt) {
    const imageToZoom = evt.target;
    photoBig.src = imageToZoom.src;
    photoBig.alt = imageToZoom.alt;
    photoBigCaption.textContent = imageToZoom.alt;
    imagePopup.classList.add('popup_opened');
  }

  //Закрыть большое изображение по клику
  _handleCardPopupClose(evt) {
    if (evt.target.matches('.button_close') || evt.target.matches('.popup')) {
      imagePopup.classList.remove('popup_opened');
    }
  }

  //Закрыть большое изображение по ESC
  _handleCardPopupCloseByKey(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      imagePopup.classList.remove('popup_opened');
    }
  }
}
