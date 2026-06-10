import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/izin`;

// Get
export const getIzinler = async () =>  {
    const response = await axios.get(API_URL);
    return response.data;
}

// Get By Id
export const getIzinById = async (id) =>  {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
}

// Post
export const createIzin = async (izin) =>  {
    const response = await axios.post(API_URL, izin);
    return response.data;
}

// Put
export const updateIzin = async (id, izin) => {
  const response = await axios.put(
    `${API_URL}/${id}`,
    izin
  );

  return response.data;
};

// Delete
export const deleteIzin = async (id) => {
  const response = await axios.delete(
    `${API_URL}/${id}`
  );

  return response.data;
};
