import { api } from './Api';

export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  //Добавить элемент на страницу
  addItem(element) {
    this._container.prepend(element);
  }

  //Отрисовать элементы
  renderItems(api) {
    api
      .then((data) => {
        data.reverse().forEach((item) => {
          this._renderer(item);
        });
      })
      .catch((err) => console.log(`Что-то пошло не так: ${err}`));
  }
}
