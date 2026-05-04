import React from 'react';
import { Routes, Route } from 'react-router-dom';
import OffersLandingPage from './OffersLandingPage';
import OffersResultsPage from './OffersResultsPage';

const OffersRoot = () => {
  return (
    <Routes>
      <Route path="/" element={<OffersLandingPage />} />
      <Route path="/results" element={<OffersResultsPage />} />
    </Routes>
  );
};

export default OffersRoot;
