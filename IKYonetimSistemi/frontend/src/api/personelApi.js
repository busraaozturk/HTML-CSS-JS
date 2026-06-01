import axios from 'axios';

const API_URL = "http://localhost:5001/api/personel";

// Get
export const getPersonel = async () =>  {
    const response = await axios.get(API_URL);
    return response.data;
}

// Get By Id
export const getPersonelById = async (id) =>  {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
}

// Post
export const createPersonel = async (personel) =>  {
    const response = await axios.post(API_URL, personel);
    return response.data;
}

// Put
export const updatePersonel = async (id, personel) => {
  const response = await axios.put(
    `${API_URL}/${id}`,
    personel
  );

  return response.data;
};

// Delete
export const deletePersonel = async (id) => {
  const response = await axios.delete(
    `${API_URL}/${id}`
  );

  return response.data;
};