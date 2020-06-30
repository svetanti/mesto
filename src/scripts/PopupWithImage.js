import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector, imageItem) {
    super(popupSelector);
    this._imageItem = imageItem;
  }

  //Открыть попап
  open() {
    super.open();
    const photoBig = this._popup.querySelector('.photo__img');
    const photoBigCaption = this._popup.querySelector('.photo__caption');
    photoBig.src = this._imageItem.link;
    photoBig.alt = this._imageItem.name;
    photoBigCaption.textContent = this._imageItem.name;
  }
}
