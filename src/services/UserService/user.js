
import axiosClient from '../axios.config';
import { endpoints } from '../endpoints';
import axios from 'axios';
export const getUsers = async () => {
  try {
    const response = await axiosClient.get(endpoints.users);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createUser = async (userData) => {
  try {
    const response = await axiosClient.post(endpoints.users, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async ( userData) => {
  try {
    const response = await axiosClient.put(`${endpoints.users}`,  userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (id) => {
    try {
      const response = await axiosClient.delete(`${endpoints.users}`, JSON.stringify(id));
      return response.data;
    } catch (error) {
      throw error;
    }
  };