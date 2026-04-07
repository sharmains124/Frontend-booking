import axios from 'axios';
import { getBaseURL } from './baseApi';

const authHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { headers: { authorization: token } } : {};
};

export const bookingService = {
  createBooking: async (body) => {
    const res = await axios.post(`${getBaseURL()}/bookings/create`, body, authHeaders());
    return res.data;
  },
  verifyPayment: async (body) => {
    const res = await axios.post(`${getBaseURL()}/bookings/verify`, body, authHeaders());
    return res.data;
  },
  getMyBookings: async () => {
    const res = await axios.get(`${getBaseURL()}/bookings/my`, authHeaders());
    return res.data;
  },
  cancelBooking: async (id) => {
    const res = await axios.put(`${getBaseURL()}/bookings/cancel/${id}`, {}, authHeaders());
    return res.data;
  }
};
