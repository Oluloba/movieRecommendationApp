import React from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const isTokenValid = (token) => {
  try {
    const { exp } = jwtDecode(token);
    return exp * 1000 > Date.now(); // Check if token is still valid
  } catch (e) {
    return false;
  }
};

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  // If no token, redirect to login
  if (!token || !isTokenValid(token)) {
    localStorage.removeItem('token'); // Clean up
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default PrivateRoute;
