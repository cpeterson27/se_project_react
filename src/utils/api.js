const baseUrl = "http://localhost:3001";

function getItems() {
  return fetch(`${baseUrl}/items`).then(checkResponse);
}

const likeItem = (id) => {
  const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/items/likes/${id}`, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then(checkResponse);
};

const unlikeItem = (id) => {
  const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/items/likes/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then(checkResponse);
};

const deleteItem = (id) => {
  const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  }).then(checkResponse);
};

const addItem = (inputValues) => {
  const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: inputValues.name,
      weather: inputValues.weather,
      imageUrl: inputValues.link,
    }),
  }).then(checkResponse);
};

const createUser = (values) => {
  return fetch(`${baseUrl}/users/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  }).then(checkResponse);
};

const loginUser = (values) => {
  return fetch(`${baseUrl}/users/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  }).then(checkResponse);
};

const getUser = () => {
  const token = localStorage.getItem("jwt");
  if (!token) {
    return Promise.reject("No token found");
  }
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then(checkResponse);
};

const updateUser = (values) => {
  const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  }).then(checkResponse);
};

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

export { deleteItem, unlikeItem, likeItem, getItems, addItem, checkResponse, createUser, getUser, updateUser, loginUser };
