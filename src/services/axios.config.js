import axios from 'axios';

// axios instance insted default axios
 const axiosClient = axios.create({
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
export default axiosClient;