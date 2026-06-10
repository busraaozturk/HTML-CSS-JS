import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/departman`;

// Get
export const getDepartmanlar = async () =>  {
    const response = await axios.get(API_URL);
    return response.data;
}

// Get By Id
export const getDepartmanById = async (id) =>  {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
}

// Post
export const createDepartman = async (departman) =>  {
    const response = await axios.post(API_URL, departman);
    return response.data;
}

// Put
export const updateDepartman = async (id, departman) => {
  const response = await axios.put(
    `${API_URL}/${id}`,
    departman
  );

  return response.data;
};

// Delete
export const deleteDepartman = async (id) => {
  const response = await axios.delete(
    `${API_URL}/${id}`
  );

  return response.data;
};
