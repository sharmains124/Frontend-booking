import axios from 'axios';
import { getBaseURL } from './baseApi';

export const couponService = {
  getCoupons: async (type) => {
    const res = await axios.get(`${getBaseURL()}/coupons`, type ? { params: { type } } : {});
    return res.data;
  }
};
