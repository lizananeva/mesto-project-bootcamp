const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.classList.add(`${config.errorClass}_active`);
  errorElement.textContent = errorMessage;
}

const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(`${config.errorClass}_active`);
  errorElement.textContent = '';
}

const checkInputValidity = (formElement, inputElement, config) => {
  !inputElement.validity.valid
  ? showInputError(formElement, inputElement, inputElement.validationMessage, config)
  : hideInputError(formElement, inputElement, config);
}

const hasInvalidInput = inputList => {
  return inputList.some((input) => {
    return !input.validity.valid;
  })
}

const removeErrors = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(`.${config.inputSelector}`));
  inputList.forEach(inputElement => {
    hideInputError(formElement, inputElement, config);
  });
}

const disableSubmitButton = (buttonElement, config) => {
  buttonElement.classList.add(config.inactiveButtonClass);
  buttonElement.disabled = true;
}

const enableSubmitButton = (buttonElement, config) => {
  buttonElement.classList.remove(config.inactiveButtonClass);
  buttonElement.disabled = false;
}

const toggleButtonState = (inputList, buttonElement, config) => {
  hasInvalidInput(inputList)
  ? disableSubmitButton(buttonElement, config)
  : enableSubmitButton(buttonElement, config);
}

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(`.${config.inputSelector}`));
  const submitButton = formElement.querySelector(`.${config.submitButtonSelector}`);
  toggleButtonState(inputList, submitButton, config);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, submitButton, config);
    });
  });
}

const enableValidation = config => {
  const formList = Array.from(document.querySelectorAll(`${config.formSelector}`));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', event => {
      event.preventDefault();
    });
    setEventListeners(formElement, config);
  });
}

export { removeErrors, enableSubmitButton, disableSubmitButton, enableValidation }
