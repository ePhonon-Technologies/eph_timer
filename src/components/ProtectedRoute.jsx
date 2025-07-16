import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ role, children }) => {
  // simulate login role (replace with actual logic)
  const userRole = role; // change this based on context or auth system

  return userRole === role ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
