const baseUrl = "http://localhost:3001";

function getItems() {
    return fetch(`${baseUrl}/items`) .then(checkResponse);
    };

const deleteItem = (id) => {
  return fetch(`${baseUrl}/items/${id}`, {
    method: 'DELETE',
  })
   .then(checkResponse);
    };

const addItem = (inputValues) => {
  return fetch(`${baseUrl}/items`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: inputValues.name,
    weather: inputValues.weather,
    imageUrl: inputValues.imageUrl,
  }),
}).then(checkResponse);
};

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};



export { deleteItem, getItems, addItem, checkResponse };