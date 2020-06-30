export default class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  //Отправить запрос
  _sendRequest(path, parameters) {
    return fetch(`${this._url}${path}`, parameters).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    });
  }

  //Получить данные пользователя
  getUserInfo() {
    return this._sendRequest(`users/me`, {
      headers: this._headers,
    });
  }

  //Получить карточки
  getInitialCards() {
    return this._sendRequest(`cards`, { headers: this._headers });
  }

  //Обновить информацию о пользователе
  updateUserInfo(newUserInfo) {
    return this._sendRequest(`users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: newUserInfo.name,
        about: newUserInfo.about,
      }),
    });
  }

  //Добавить новую карточку
  addNewCard(newCard) {
    return this._sendRequest(`cards`, {
      method: 'POST',
      body: JSON.stringify({
        name: newCard.name,
        link: newCard.link,
      }),
      headers: this._headers,
    });
  }

  //Лайк
  likeCard(id) {
    return this._sendRequest(`cards/likes/${id}`, {
      method: 'PUT',
      headers: this._headers,
    });
  }

  //Дизлайк
  dislikeCard(id) {
    return this._sendRequest(`cards/likes/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    });
  }

  //Удалить фото
  deletePhoto(id) {
    return this._sendRequest(`cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    });
  }

  //Обновить аватар
  updateUserAvatar(avatar) {
    return this._sendRequest(`users/me/avatar`, {
      method: 'PATCH',
      body: JSON.stringify({ avatar: avatar.url }),
      headers: this._headers,
    });
  }
}
