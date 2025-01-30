import axios from 'axios';

const API_URL = 'http://localhost:3001/user';
export const Adduserdata = async (data) => {
  try {
    return await axios.post(API_URL, data);
  } catch (error) {
    console.log('Error When Add User Data', error.message);
  }
};

export const getUser = async () => {
  try {
    return await axios.get(API_URL);
  } catch (error) {
    console.log('Error while fetch data', error.message);
  }
};

export const getUserFromId = async (data) => {
  try {
    return await axios.get(`${API_URL}/${data}`);
  } catch (error) {
    console.log('Error while fetch data from Id', error.message);
  }
};

export const EditUserData = async (data, id) => {
  try {
    return await axios.put(`${API_URL}/${id}`, data);
  } catch (error) {
    console.log('Error while Editdata from Id', error.message);
  }
};

export const DeleteUserData = async (id) => {
  try {
    return await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.log('Error while Delete data from Id', error.message);
  }
};
