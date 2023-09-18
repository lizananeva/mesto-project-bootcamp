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

const cardTemplate = document.querySelector('#card').content;
const cardElement = cardTemplate.querySelector('.photo-grid__item');
const listElement = document.querySelector('.photo-grid__list');

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
  listElement.append(card);
}

initialCards.forEach(el => {
  const newCard = createCard(el);
  addCard(newCard);
});
