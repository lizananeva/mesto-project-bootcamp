import './../pages/index.css';
import { getUserData, getInitialCards, setUserData, setUserAvatar, addUserCard } from './api';
import { createCard, addCard } from './card.js';
import { removeErrors, enableSubmitButton, disableSubmitButton, enableValidation } from './validate.js';
import { openPopup, closePopup } from './modal.js';
import { renderLoading } from './utils';
//Редактирование профиля
const profileEditButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup_type_edit-profile');
const profileForm = document.forms['profile'];
const profileNameInput = profileForm.elements['name'];
const profileAboutInput = profileForm.elements['about'];
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const profileAvatar = document.querySelector('.profile__avatar');
//Редактирование аватара
const avatarEditButton = document.querySelector('.profile__avatar-edit-button');
const avatarPopup = document.querySelector('.popup_type_edit-avatar');
const avatarForm = document.forms['avatar'];
const avatarLinkInput = avatarForm.elements['link'];
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

Promise.all([getUserData(), getInitialCards()])
  .then((results) => {
    const userData = results[0];
    const initialCards = results[1];
    profileName.textContent = userData.name;
    profileAbout.textContent = userData.about;
    profileAvatar.src = userData.avatar;
    localStorage.setItem('id', userData._id);
    initialCards.forEach(el => {
      const newCard = createCard(el);
      addCard(newCard);
    })
  })
  .catch(err => console.log(err.status))

enableValidation(validationConfig);

const handleProfileFormSubmit = event => {
  event.preventDefault();
  renderLoading(true, event.submitter);
  setUserData({name: profileNameInput.value, about: profileAboutInput.value})
    .then(res => {
      profileName.textContent = res.name;
      profileAbout.textContent = res.about;
      closePopup(profilePopup);
    })
    .catch(err => console.log(err.status))
    .finally(() => renderLoading(false, event.submitter));
}

const handleAvatarFormSubmit = event => {
  event.preventDefault();
  renderLoading(true, event.submitter);
  setUserAvatar({avatar: avatarLinkInput.value})
    .then(res => {
      profileAvatar.src = res.avatar;
      disableSubmitButton(event.submitter, validationConfig);
      closePopup(avatarPopup);
    })
    .catch(err => console.log(err.status))
    .finally(() => renderLoading(false, event.submitter));
}

const handleCardFormSubmit = event => {
  event.preventDefault();
  renderLoading(true, event.submitter);
  addUserCard({name: cardNameInput.value, link: cardLinkInput.value})
    .then(res => {
      const newCard = createCard(res);
      addCard(newCard);
      disableSubmitButton(event.submitter, validationConfig);
      closePopup(cardPopup);
    })
    .catch(err => console.log(err.status))
    .finally(() => renderLoading(false, event.submitter));
}

profileEditButton.addEventListener('click', event => {
  profileNameInput.value = profileName.textContent;
  profileAboutInput.value = profileAbout.textContent;
  removeErrors(profileForm, validationConfig);
  enableSubmitButton(profileForm.querySelector(validationConfig.submitButtonSelector), validationConfig);
  openPopup(profilePopup);
});

avatarEditButton.addEventListener('click', event => {
  avatarForm.reset();
  removeErrors(avatarForm, validationConfig);
  openPopup(avatarPopup);
});

cardAddButton.addEventListener('click', event => {
  cardForm.reset();
  removeErrors(cardForm, validationConfig);
  openPopup(cardPopup);
});

profileForm.addEventListener('submit', handleProfileFormSubmit);
avatarForm.addEventListener('submit', handleAvatarFormSubmit);
cardForm.addEventListener('submit', handleCardFormSubmit);
