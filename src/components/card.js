import { likeCard, unlikeCard } from './api';
import { openPopup } from './modal.js';

const cardTemplate = document.getElementById('card').content;
const cardElement = cardTemplate.querySelector('.photo-grid__item');
const cardsList = document.querySelector('.photo-grid__list');
const photoPopup = document.querySelector('.popup_type_photo');
const photoPopupImage = photoPopup.querySelector('.popup__image');
const photoPopupCaption = photoPopup.querySelector('.popup__caption');

export const delPopup = document.querySelector('.popup_type_delete-card');
export const cardForDelete = {};

const createCard = (data, userId) => {
  const card = cardElement.cloneNode(true);
  const cardImage = card.querySelector('.photo__image');
  const cardCaption = card.querySelector('.photo__caption');
  const cardLikeButton = card.querySelector('.photo__like-button');
  const cardLikesCount = card.querySelector('.photo__like-count');
  const cardDeleteButton = card.querySelector('.photo__delete-button');

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardCaption.textContent = data.name;
  cardLikesCount.textContent = data.likes.length;

  if (data.likes.some(({ _id }) => _id === userId)) {
      cardLikeButton.classList.add('photo__like-button_active');
  }

  if (data.owner._id !== userId) {
    cardDeleteButton.remove();
  }

  cardImage.addEventListener('click', event => {
    openPopup(photoPopup);
    photoPopupImage.src = cardImage.src;
    photoPopupImage.alt = cardImage.alt;
    photoPopupCaption.textContent = cardImage.alt;
  });
  cardLikeButton.addEventListener('click', event => {
    if (event.target.classList.contains('photo__like-button_active')) {
      unlikeCard(data._id)
        .then(res => {
          event.target.classList.remove('photo__like-button_active');
          cardLikesCount.textContent = res.likes.length;
        })
        .catch(err => console.log(err.status))
    } else {
      likeCard(data._id)
        .then(res => {
          event.target.classList.add('photo__like-button_active');
          cardLikesCount.textContent = res.likes.length;
        })
        .catch(err => console.log(err.status))
    }
  });
  cardDeleteButton.addEventListener('click', () => {
    openPopup(delPopup);
    cardForDelete.id = data._id;
    cardForDelete.card = card;
  });

  return card;
}

const addCard = card => {
  cardsList.prepend(card);
}

export { createCard, addCard };
