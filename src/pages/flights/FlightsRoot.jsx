import React from 'react';
import { Routes, Route } from 'react-router-dom';
import FlightLandingPage from './FlightLandingPage';
import FlightResultsPage from './FlightResultsPage';
import FlightDetails from './FlightDetails';

const FlightsRoot = () => {
  return (
    <Routes>
      <Route path="/" element={<FlightLandingPage />} />
      <Route path="/search" element={<FlightResultsPage />} />
      <Route path="/details/:id" element={<FlightDetails />} />
    </Routes>
  );
};

export default FlightsRoot;
