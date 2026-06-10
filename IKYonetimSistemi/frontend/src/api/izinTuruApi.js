import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/izin-turleri`;

// Get
export const getIzinTurleri = async () =>  {
    const response = await axios.get(API_URL);
    return response.data;
}

// Get By Id
export const getIzinTuruById = async (id) =>  {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
}

// Post
export const createIzinTuru = async (izinTuru) =>  {
    const response = await axios.post(API_URL, izinTuru);
    return response.data;
}

// Put
export const updateIzinTuru = async (id, izinTuru) => {
  const response = await axios.put(
    `${API_URL}/${id}`,
    izinTuru
  );

  return response.data;
};

// Delete
export const deleteIzinTuru = async (id) => {
  const response = await axios.delete(
    `${API_URL}/${id}`
  );

  return response.data;
};
