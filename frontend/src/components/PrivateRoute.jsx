import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const token = localStorage.getItem('token'); // Check if token exists

  if (!token) {
    return <Navigate to="/login" replace />; // Redirect to login if no token
  }

  return <Outlet />; // Render the child routes if token exists
};

export default PrivateRoute;
