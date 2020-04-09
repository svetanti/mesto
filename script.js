const editButton = document.querySelector('.profile__button_action_edit');
let popup = document.querySelector('.popup');
const closeButton = document.querySelector('.popup__button_close');
const submitButton = document.querySelector('.popup__button_submit');
const inputUser = document.querySelector('.popup__input-item_type_name');
let inputAbout = document.querySelector('.popup__input-item_type_about');
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');

function showPopup() {
  popup.classList.add('popup_opened');
  inputUser.setAttribute('value', profileName.textContent);
  inputAbout.setAttribute('value', profileAbout.textContent);
}

function hidePopup() {
  popup.classList.remove('popup_opened');
  inputUser.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
}

editButton.addEventListener('click', showPopup);
closeButton.addEventListener('click', hidePopup);

let formElement = document.querySelector('.popup__container');

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = inputUser.value;
    profileAbout.textContent = inputAbout.value;
    hidePopup();
}

formElement.addEventListener('submit', formSubmitHandler);
