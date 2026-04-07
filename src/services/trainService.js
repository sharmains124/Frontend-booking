import axios from 'axios';
import { getBaseURL } from './baseApi';

export const trainService = {
  searchTrains: async (params) => {
    const res = await axios.get(`${getBaseURL()}/trains/search`, { params });
    return res.data;
  }
};
