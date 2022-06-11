// This component is to protect the / route so that unauthorized users can't access it
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, loggedIn, ...props }) => {
  return loggedIn ? children : <Navigate {...props} to='/signin' />;
};

export default ProtectedRoute;
