import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import BusLandingPage from './BusLandingPage';
import BusResultsPage from './BusResultsPage';

const BusRoot = () => {
  return (
    <Routes>
      {/* /bus/ */}
      <Route path="/" element={<BusLandingPage />} />
      
      {/* /bus/results */}
      <Route path="/results" element={<BusResultsPage />} />
      
      {/* Redirect any other /bus/* to /bus/ */}
      <Route path="*" element={<Navigate to="" replace />} />
    </Routes>
  );
};

export default BusRoot;
