import './../pages/index.css';
import initialCards from './data.js';
import { createCard, addCard } from './card.js';
import { removeErrors, enableSubmitButton, disableSubmitButton, enableValidation } from './validate.js';
import { openPopup, closePopup } from './modal.js';
//Редактирование профиля
const profileEditButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup_type_edit-profile');
const profileForm = document.forms['profile'];
const profileNameInput = profileForm.elements['name'];
const profileDescInput = profileForm.elements['desc'];
const profileName = document.querySelector('.profile__name');
const profileDesc = document.querySelector('.profile__description');
//Добавление новой карточки
const cardAddButton = document.querySelector('.profile__add-button');
const cardPopup = document.querySelector('.popup_type_add-card');
const cardForm = document.forms['card'];
const cardNameInput = cardForm.elements['name'];
const cardLinkInput = cardForm.elements['link'];
//Объект настроек валидации всех форм
const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save',
  inactiveButtonClass: 'form__save_disabled',
  inputErrorClass: 'form__input_invalid',
  errorClass: 'form__input-error'
};

initialCards.forEach(el => {
  const newCard = createCard(el);
  addCard(newCard);
});

enableValidation(validationConfig);

const handleProfileFormSubmit = event => {
  event.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDesc.textContent = profileDescInput.value;
  closePopup(profilePopup);
}

const handleCardFormSubmit = event => {
  event.preventDefault();
  const newCard = createCard({name: cardNameInput.value, link: cardLinkInput.value});
  addCard(newCard);
  disableSubmitButton(event.submitter, validationConfig);
  closePopup(cardPopup);
}

profileEditButton.addEventListener('click', event => {
  profileNameInput.value = profileName.textContent;
  profileDescInput.value = profileDesc.textContent;
  removeErrors(profileForm, validationConfig);
  enableSubmitButton(profileForm.querySelector(validationConfig.submitButtonSelector), validationConfig);
  openPopup(profilePopup);
});

cardAddButton.addEventListener('click', event => {
  cardForm.reset();
  removeErrors(cardForm, validationConfig);
  openPopup(cardPopup);
});

profileForm.addEventListener('submit', handleProfileFormSubmit);
cardForm.addEventListener('submit', handleCardFormSubmit);
