import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DestinationsLandingPage from './DestinationsLandingPage';
import DestinationsResultsPage from './DestinationsResultsPage';

const DestinationsRoot = () => {
  return (
    <Routes>
      <Route path="/" element={<DestinationsLandingPage />} />
      <Route path="/results" element={<DestinationsResultsPage />} />
    </Routes>
  );
};

export default DestinationsRoot;
