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
}

const closePopup = popup => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handlePopupEscape);
}

popupList.forEach(popup => {
  popup.addEventListener('mousedown', handlePopupOverlay);
});

export { openPopup, closePopup }
