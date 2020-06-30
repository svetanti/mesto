export default class Card {
  constructor(data, api, { cardSelector, handleCardClick, confirmDelete }) {
    this._api = api;
    this._cardSelector = cardSelector;
    this._name = data.name;
    this._link = data.link;
    this._owner = data.owner;
    this._likes = data.likes;
    this._id = data._id;
    this._confirmDelete = confirmDelete;
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
  generateCard(userData) {
    this._cardItem = this._getCardTemplate();

    this._setEventListeners();

    const cardPhoto = this._cardItem.querySelector('.card__photo');
    cardPhoto.src = this._link;
    cardPhoto.alt = this._name;
    this._cardItem.querySelector('.card__caption').textContent = this._name;
    this._cardItem.id = this._id;
    this._cardItem.querySelector(
      '.card__counter'
    ).textContent = `${this._likes.length}`;

    if (userData._id === this._owner._id) {
      this._cardItem.querySelector('.card__delete').style.display = 'block';
    }

    if (this._likes.find((like) => like._id === userData._id)) {
      this._cardItem
        .querySelector('.card__like')
        .classList.add('card__like_active');
    }

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
        this._confirmDelete();
      });
    this._cardItem
      .querySelector('.card__photo')
      .addEventListener('click', (evt) => {
        this._handleCardClick(evt);
      });
  }

  //Лайк
  _handleCardLike() {
    const likeButton = this._cardItem.querySelector('.card__like');
    const counter = this._cardItem.querySelector('.card__counter');

    if (!likeButton.classList.contains('card__like_active')) {
      this._api
        .likeCard(this._id)
        .then((data) => {
          likeButton.classList.add('card__like_active');
          counter.textContent = `${data.likes.length}`;
        })
        .catch((err) => console.log(`Что-то пошло не так: ${err}`));
    } else {
      this._api
        .dislikeCard(this._id)
        .then((data) => {
          likeButton.classList.remove('card__like_active');
          counter.textContent = `${data.likes.length}`;
        })
        .catch((err) => console.log(`Что-то пошло не так: ${err}`));
    }
  }
}
