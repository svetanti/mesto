class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  //Отправить запрос
  _sendRequest(path, parameters) {
    return fetch(`${this._url}${path}`, parameters)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .catch((err) => console.log(`Что-то пошло не так: ${err}`));
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

  deletePhoto(id) {
    return this._sendRequest(`cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    });
  }

  updateUserAvatar(avatar) {
    return this._sendRequest(`users/me/avatar`, {
      method: 'PATCH',
      body: JSON.stringify({ avatar: avatar.url }),
      headers: this._headers,
    });
  }
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-12/',
  headers: {
    authorization: 'b40f325a-73c8-493d-8833-d885268eb953',
    'Content-Type': 'application/json',
  },
});
