class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  //Получить начальные данные пользователя
  getInitialUserInfo() {
    return fetch(`${this._url}users/me`, { headers: this._headers })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .catch((err) => console.log(`Всё пошло не так: ${err}`));
  }

  //Получить начальные карточки
  getInitialCards() {
    return fetch(`${this._url}cards`, { headers: this._headers })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .catch((err) => console.log(`Всё снова пошло не так: ${err}`));
  }

  //Обновить информацию о пользователе
  updateUserInfo(newUserInfo) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: newUserInfo.name,
        about: newUserInfo.about,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .catch((err) => console.log(`Всё сломалось, ищем ошибку: ${err}`));
  }

  addNewCard(newCard) {
    return fetch(`${this._url}cards`, {
      method: 'POST',
      body: JSON.stringify({
        name: newCard.name,
        link: newCard.link,
      }),
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .catch((err) => console.log(`Ничего не работает: ${err}`));
  }
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-12/',
  headers: {
    authorization: 'b40f325a-73c8-493d-8833-d885268eb953',
    'Content-Type': 'application/json',
  },
});
