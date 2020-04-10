const editButton = document.querySelector('.profile__button_action_edit');
let popup = document.querySelector('.popup');
const closeButton = document.querySelector('.popup__button_close');
let inputUser = document.querySelector('#userName');
let inputAbout = document.querySelector('#aboutUser');
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');

function togglePopup() {
  editButton.addEventListener('click', function() {
    popup.classList.add('popup_opened');
    inputUser.setAttribute('value', profileName.textContent);
    inputAbout.setAttribute('value', profileAbout.textContent);
    });
  closeButton.addEventListener('click', function() {
    popup.classList.remove('popup_opened');
    });
}

togglePopup();

let formElement = document.querySelector('.popup__container');

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = inputUser.value;
    profileAbout.textContent = inputAbout.value;
    popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler);
