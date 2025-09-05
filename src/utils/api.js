const baseUrl = "http://localhost:3001";

function getItems() {
    return fetch(`${baseUrl}/items`) .then((res) => {
        return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
    });
}



const deleteItem = (id) => {
  return fetch(`http://localhost:3001/items/${id}`, {
    method: 'DELETE',
  })
    .then((response) => {
      if (response.ok) {
        // Handle successful deletion
        console.log('Item deleted');
        return response;
      } else {
        // Handle errors
        throw new Error('Failed to delete item');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      throw error;
    });
};


export { deleteItem, getItems };