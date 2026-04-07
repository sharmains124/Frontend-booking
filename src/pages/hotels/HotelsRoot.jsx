import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HotelLandingPage from './HotelLandingPage';
import HotelResultsPage from './HotelResultsPage';
import HotelDetailsPage from './HotelDetailsPage';
import HotelReviewPage from './HotelReviewPage';
import HotelPaymentPage from './HotelPaymentPage';

const HotelsRoot = () => {
  return (
    <Routes>
      <Route index element={<HotelLandingPage />} />
      <Route path="results" element={<HotelResultsPage />} />
      <Route path="details/:id" element={<HotelDetailsPage />} />
      <Route path="review" element={<HotelReviewPage />} />
      <Route path="payment" element={<HotelPaymentPage />} />
    </Routes>
  );
};

export default HotelsRoot;
