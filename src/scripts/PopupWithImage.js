import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(evt) {
    super.open();
    const photoBig = this._popup.querySelector('.photo__img');
    const photoBigCaption = this._popup.querySelector('.photo__caption');
    const imageToZoom = evt.target;
    photoBig.src = imageToZoom.src;
    photoBig.alt = imageToZoom.alt;
    photoBigCaption.textContent = imageToZoom.alt;
  }
}
