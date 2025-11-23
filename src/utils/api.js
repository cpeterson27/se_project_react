import { BASE_URL } from "../utils/constants";

export const handleServerResponse = async (res) => {
  const data = await res.json();
  if (!res.ok) {
    const error = new Error(data.message || `Error: ${res.status}`);
    error.status = res.status;
    throw error;
  }
  return data;
};


export function request(url, options) {
  return fetch(url, options).then(handleServerResponse);
}

const getItemList = () => {
  return request(`${BASE_URL}/items`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const addItem = ({ name, weather, imageUrl }, token) => {
  return request(`${BASE_URL}/items`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      weather,
      imageUrl,
    }),
  });
};

const removeItem = (id, token) => {
  return request(`${BASE_URL}/items/${id}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

const addCardLike = (id, token) => {
  return request(`${BASE_URL}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

const removeCardLike = (id, token) => {
  return request(`${BASE_URL}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export {
  getItemList,
  addItem,
  removeItem,
  addCardLike,
  removeCardLike,
};
