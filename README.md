# Место. Одностраничное веб-приложение

---

Приложение позволяет пользователю добавлять и удалять свои фотографии, ставить лайки и редактировать информацию о себе.

Проект создан с использованием возможностей HTML, CSS и JavaScript и адаптирован для просмотра на разных устройствах. При вёрстке использован подход Desktop First.

Реализована валидация форм: при вводе некорректных данных отправка формы блокируется, в полях ввода появляются сообщения об ошибках. Также добавлена возможность закрыть модальное окно кликом на оверлей и по нажатию клавиши Escape.

Проведен рефакторинг кода. Функционал, отвечающий за создание карточек и валидацию, вынесен в отдельные классы. Скрипт разбит на три модуля.

Весь JavaScript-код разбит на классы, константы вынесены в отдельный модуль. Установлен Webpack, Babel, настроена обработка CSS, HTML, изображений и шрифтов.

Проект подключен к серверу. Настроена возможность редактироавть аватар, добавлено подтверждение при удалении фотографии.

## Стек

- HTML
- CSS
- Native JavaScript
- Webpack

---

## Реализация

- Grid Layout
- Flexbox-вёрстка
- Медиазапросы
- Использование относительных величин при указании размеров блоков и элементов
- Использование JavaScript для создания интерактивных элементов страницы
- Использование JavaScript для внесения изменений в DOM
- Использование JavaScript для валидации форм
- ООП
- Webpack
- API

## Ссылка на проект

https://svetanti.github.io/mesto-vanilla-js/

# Mesto. The single page application

---

The application allows to add and delete photos and like them. The user can also edit their name and info.

The project is created using some features of HTML, CSS and JavaScript and it is adapted for viewing on different devices. The desktop-first approach is used.

The form validation is enabled: when user fills up input field with incorrect data the form submission is blocked and the error messages appear in input fields. Aslo added the possibility to close modal windows by clicking on the overlay and by pressing Escape button.

The parts of code describing cards creation and form validation are encapsulated in classes. The script is divided into three modules.

The JavaScript code is devided into classes, constancts are encapsulated in a single module. The Webpack is installed, the Babel, CSS and HTML-plugins, images and fonts loaders are set.

The project is connected to a server. The user can change an avatar. Aslo added the confirmation before deleting a photo.

---

## Stack

- HTML
- CSS
- Native JavaScript
- Webpack

## Realization

- Grid Layout
- Flexbox
- Media queries
- Relative units
- JavaScript for interactive elements of web page
- JavaScript for making changes in DOM
- JavaScript for form validation
- OOP
- Webpack
- API

## URL

https://svetanti.github.io/mesto-vanilla-js/
