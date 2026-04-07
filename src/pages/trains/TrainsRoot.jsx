import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TrainLandingPage from './TrainLandingPage';
import TrainResultsPage from './TrainResultsPage';
import TrainDetailsPage from './TrainDetailsPage';
import TrainReviewPage from './TrainReviewPage';
import TrainPaymentPage from './TrainPaymentPage';

const TrainsRoot = () => {
  return (
    <Routes>
      <Route index element={<TrainLandingPage />} />
      <Route path="results" element={<TrainResultsPage />} />
      <Route path="details/:id" element={<TrainDetailsPage />} />
      <Route path="review" element={<TrainReviewPage />} />
      <Route path="payment" element={<TrainPaymentPage />} />
    </Routes>
  );
};

export default TrainsRoot;
