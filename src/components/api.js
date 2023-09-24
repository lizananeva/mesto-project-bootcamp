const config = {
  baseUrl: 'https://nomoreparties.co/v1/wbf-cohort-12',
  headers: {
    authorization: '16ed90c9-12a0-4919-8ff0-430d22a9bbfe',
    'Content-Type': 'application/json'
  }
}

const checkResponse = res => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const getUserData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers
  })
  .then(res => checkResponse(res))
}

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers
  })
  .then(res => checkResponse(res))
}

export const setUserData = data => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: data.name,
      about: data.about
    })
  })
  .then(res => checkResponse(res))
}

export const setUserAvatar = data => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: data.avatar,
    })
  })
  .then(res => checkResponse(res))
}

export const addUserCard = data => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: data.name,
      link: data.link
    })
  })
  .then(res => checkResponse(res))
}

export const deleteUserCard = id => {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(res => checkResponse(res))
}

export const likeCard = id => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then(res => checkResponse(res))
}

export const unlikeCard = id => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(res => checkResponse(res))
}
