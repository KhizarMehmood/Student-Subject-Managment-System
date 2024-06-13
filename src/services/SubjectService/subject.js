
import axiosClient from '../axios.config';
import { endpoints } from '../endpoints';

export const getSubjects = async () => {
  try {
    const response = await axiosClient.get(endpoints.subjects);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createSubject = async (subjectData) => {
  try {
    const response = await axiosClient.post(endpoints.subjects, subjectData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateSubject = async (subjectId, subjectData) => {
  try {
    const response = await axiosClient.put(`${endpoints.subjects}`, subjectData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const deleteSubject = async (subjectId) => {
    try {
      const response = await axiosClient.delete(`${endpoints.subjects}`,subjectId);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
