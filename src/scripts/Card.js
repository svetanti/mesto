export default class Card {
  constructor(data, like, dislike, { cardSelector, handleCardClick, confirmDelete }) {
    this._cardSelector = cardSelector;
    this._name = data.name;
    this._link = data.link;
    this._owner = data.owner;
    this._likes = data.likes;
    this._id = data._id;
    this._like = like;
    this._dislike = dislike;
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
  generateCard(api) {
    this._cardItem = this._getCardTemplate();

    this._setEventListeners();

    this._cardItem.id = this._id;

    const cardPhoto = this._cardItem.querySelector('.card__photo');
    cardPhoto.src = this._link;
    cardPhoto.alt = this._name;
    this._cardItem.querySelector('.card__caption').textContent = this._name;

    this._cardItem.querySelector(
      '.card__counter'
    ).textContent = `${this._likes.length}`;

    api.then((user) => {
      if (user._id !== this._owner._id) {
        this._cardItem.querySelector('.card__delete').style.display = 'none';
      }
    });

    api.then((user) => {
    this._likes.forEach((likeObject) => {
      if (user._id === likeObject._id) {
        this._cardItem.querySelector('.card__like').classList.add('card__like_active');
      }

    });
  })

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
        //this._handleCardDelete(evt);


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
      this._like.then((likesData) => {
        likeButton.classList.add('card__like_active');
        counter.textContent = `${likesData.likes.length}`;
      });
    } else {
      this._dislike.then((likesData) => {
        likeButton.classList.remove('card__like_active');
        counter.textContent = `${likesData.likes.length}`;
      });
    }
  }

  //Удаление
  _handleCardDelete(evt) {
    const cardToDelete = evt.target.closest('.card');
    cardToDelete.remove();
  }
}
