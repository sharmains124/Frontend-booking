import axios from 'axios';
import { getBaseURL } from './baseApi';

export const busService = {
  searchBuses: async (params) => {
    const res = await axios.get(`${getBaseURL()}/buses/search`, { params });
    return res.data;
  }
};
