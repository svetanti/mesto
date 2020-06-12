export default class Card {
  constructor(data, { cardSelector, handleCardClick }) {
    this._cardSelector = cardSelector;
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
  }

  //Добавить разметку карточки
  _getCardTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector('.card')
      .cloneNode(true);

    this._cardItem = cardElement;

    return cardElement;
  }

  //Сгенерировать карточку
  generateCard() {
    this._cardItem = this._getCardTemplate();
    this._setEventListeners();
    this._handleCardClick();
    const cardPhoto = this._cardItem.querySelector('.card__photo');
    cardPhoto.src = this._link;
    cardPhoto.alt = this._name;
    this._cardItem.querySelector('.card__caption').textContent = this._name;

    return this._cardItem;
  }

  //Установить слушатели событий
  _setEventListeners() {
    this._cardItem
      .querySelector('.card__like')
      .addEventListener('click', () => {
        this._handleCardLike();
      });
    this._cardItem
      .querySelector('.card__delete')
      .addEventListener('click', (evt) => {
        this._handleCardDelete(evt);
      });
  }

  //Лайк
  _handleCardLike() {
    this._cardItem
      .querySelector('.card__like')
      .classList.toggle('card__like_active');
  }

  //Удаление
  _handleCardDelete(evt) {
    const cardToDelete = evt.target.closest('.card');
    cardToDelete.remove();
  }
}
