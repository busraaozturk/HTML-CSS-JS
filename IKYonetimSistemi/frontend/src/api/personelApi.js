import axios from 'axios';

const API_URL = "http://localhost:5001/api/personel";

export const getPersonel = async () =>  {
    const response = await axios.get(API_URL);
    return response.data;
}

export const getPersonelById = async (id) =>  {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
}

export const createPersonel = async (personel) =>  {
    const response = await axios.post(API_URL, personel);
    return response.data;
}

export const updatePersonel = async (id, personel) => {
  const response = await axios.put(
    `${API_URL}/${id}`,
    personel
  );

  return response.data;
};


export const deletePersonel = async (id) => {
  const response = await axios.delete(
    `${API_URL}/${id}`
  );

  return response.data;
};