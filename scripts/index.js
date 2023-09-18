const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//Создание списка карточек
const cardTemplate = document.querySelector('#card').content; //Шаблон карточки
const cardElement = cardTemplate.querySelector('.photo-grid__item'); //Элемент карточки
const cardsList = document.querySelector('.photo-grid__list'); //Контейнер для карточек

//Добавление новой карточки
const cardAddButton = document.querySelector('.profile__add-button'); //Кнопка добавления карточки
const cardPopup = document.querySelector('.popup_type_add-card'); //Попап добавления карточки
const cardForm = cardPopup.querySelector('.form'); //Форма добавления карточки
const cardName = cardForm.querySelector('.form__input[name=card-name]'); //Поле ввода (Название) в форме добавления карточки
const cardLink = cardForm.querySelector('.form__input[name=card-link]'); //Поле ввода (Ссылка на картинку) в форме добавления карточки

//Закрытие всех попапов
const popupCloseButtons = cardPopup.querySelectorAll('.popup__close');

function createCard({name, link}) {
  const card = cardElement.cloneNode(true);
  const cardImage = card.querySelector('.photo__image');
  const cardCaption = card.querySelector('.photo__caption');
  cardImage.src = link;
  cardImage.alt = name;
  cardCaption.textContent = name;
  return card;
}

function addCard(card) {
  cardsList.prepend(card);
}

initialCards.forEach(el => {
  const newCard = createCard(el);
  addCard(newCard);
});

function openPopup(popup) {
  if (!popup.classList.contains('popup_opened')) {
    popup.classList.add('popup_opened');
  }
}

function closePopup(popup) {
  if (popup.classList.contains('popup_opened')) {
    popup.classList.remove('popup_opened');
  }
}

function handleSubmitForm(event) {
  // сделать универсальным
  event.preventDefault();
  const newCard = createCard({name: cardName.value, link: cardLink.value});
  addCard(newCard);
  cardName.value = '';
  cardLink.value = '';
}

cardAddButton.addEventListener('click', event => {
  openPopup(cardPopup);
});

popupCloseButtons.forEach(button => {
  button.addEventListener('click', event => {
    closePopup(cardPopup);
  });
});

cardForm.addEventListener('submit', handleSubmitForm);
