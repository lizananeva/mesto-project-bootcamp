const renderLoading = (isLoading, buttonElement, defaultText='Сохранить', loadingText='Сохранение...') => {
  isLoading
  ? buttonElement.textContent = loadingText
  : buttonElement.textContent = defaultText;
};

export { renderLoading }
