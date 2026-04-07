import axios from 'axios';
import { getBaseURL } from './baseApi';

export const hotelService = {
  searchHotels: async (params) => {
    const res = await axios.get(`${getBaseURL()}/hotels/search`, { params });
    return res.data;
  },
  getCitySuggestions: async (keyword) => {
    const res = await axios.get(`${getBaseURL()}/hotels/cities/suggest`, { params: { keyword } });
    return res.data;
  }
};
