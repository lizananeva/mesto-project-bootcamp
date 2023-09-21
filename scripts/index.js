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

//Редактирование профиля
const profileEditButton = document.querySelector('.profile__edit-button'); //Кнопка редактирования профиля
const profilePopup = document.querySelector('.popup_type_edit-profile'); //Попап редактирования профиля
const profileForm = document.forms['profile-form']; //Форма редактирования профиля
const profileNameInput = profileForm.querySelector('.form__input[name=profile-name]'); //Поле ввода (Имя) в форме редактирования профиля
const profileDescInput = profileForm.querySelector('.form__input[name=profile-desc]'); //Поле ввода (Род деятельности) в форме редактирования профиля
const profileName = document.querySelector('.profile__name'); //Имя профиля на странице
const profileDesc = document.querySelector('.profile__description'); //Описание профиля на странице

//Создание списка карточек
const cardTemplate = document.querySelector('#card').content; //Шаблон карточки
const cardElement = cardTemplate.querySelector('.photo-grid__item'); //Элемент карточки
const cardsList = document.querySelector('.photo-grid__list'); //Контейнер для карточек

//Добавление новой карточки
const cardAddButton = document.querySelector('.profile__add-button'); //Кнопка добавления карточки
const cardPopup = document.querySelector('.popup_type_add-card'); //Попап добавления карточки
const cardForm = document.forms['card-form']; //Форма добавления карточки
const cardName = cardForm.querySelector('.form__input[name=card-name]'); //Поле ввода (Название) в форме добавления карточки
const cardLink = cardForm.querySelector('.form__input[name=card-link]'); //Поле ввода (Ссылка на картинку) в форме добавления карточки

//Попап просмотра изображения
const photoPopup = document.querySelector('.popup_type_photo'); //Попап просмотра карточки
const photoPopupImage = photoPopup.querySelector('.popup__image'); // Изображение карточки в попапе
const photoPopupCaption = photoPopup.querySelector('.popup__caption'); //Подпись карточки в попапе

//Список всех попапов
const popupList = document.querySelectorAll('.popup');

const handlePopupEscape = event => {
  if (event.key === 'Escape') {
    popupList.forEach(popup => closePopup(popup));
  }
}

const handlePopupOverlay = event => {
  if (event.target.classList.contains('popup__close') || event.target.classList.contains('popup')) {
    closePopup(event.target.closest('.popup'));
  }
}

const openPopup = popup => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handlePopupEscape);
  document.addEventListener('click', handlePopupOverlay);
}

const closePopup = popup => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handlePopupEscape);
  document.removeEventListener('click', handlePopupOverlay);
}

function handleProfileFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDesc.textContent = profileDescInput.value;
  closePopup(profilePopup);
}

function createCard({name, link}) {
  const card = cardElement.cloneNode(true);
  const cardImage = card.querySelector('.photo__image');
  const cardCaption = card.querySelector('.photo__caption');
  const cardLikeButton = card.querySelector('.photo__like-button');
  const cardDeleteButton = card.querySelector('.photo__delete-button');
  cardImage.src = link;
  cardImage.alt = name;
  cardCaption.textContent = name;
  cardImage.addEventListener('click', event => {
    openPopup(photoPopup);
    photoPopupImage.src = cardImage.src;
    photoPopupImage.alt = cardImage.alt;
    photoPopupCaption.textContent = cardImage.alt;
  });
  cardLikeButton.addEventListener('click', event => event.target.classList.toggle('photo__like-button_active'));
  cardDeleteButton.addEventListener('click', () => card.remove());
  return card;
}

function addCard(card) {
  cardsList.prepend(card);
}

initialCards.forEach(el => {
  const newCard = createCard(el);
  addCard(newCard);
});

function handleCardFormSubmit(event) {
  event.preventDefault();
  const newCard = createCard({name: cardName.value, link: cardLink.value});
  addCard(newCard);
  event.target.reset();
  closePopup(cardPopup);
}

profileEditButton.addEventListener('click', event => {
  openPopup(profilePopup);
  profileNameInput.value = profileName.textContent;
  profileDescInput.value = profileDesc.textContent;
});

profileForm.addEventListener('submit', handleProfileFormSubmit)

cardAddButton.addEventListener('click', event => {
  openPopup(cardPopup);
});

cardForm.addEventListener('submit', handleCardFormSubmit);
