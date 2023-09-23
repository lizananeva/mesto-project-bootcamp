import { openPopup } from './modal.js';

const cardTemplate = document.querySelector('#card').content;
const cardElement = cardTemplate.querySelector('.photo-grid__item');
const cardsList = document.querySelector('.photo-grid__list');
const photoPopup = document.querySelector('.popup_type_photo');
const photoPopupImage = photoPopup.querySelector('.popup__image');
const photoPopupCaption = photoPopup.querySelector('.popup__caption');

const createCard = ({name, link}) => {
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

const addCard = card => {
  cardsList.prepend(card);
}

export { createCard, addCard };
