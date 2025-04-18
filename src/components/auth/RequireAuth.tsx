import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const RequireAuth: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authenticated but not verified, redirect to verification
  if (isAuthenticated && user && !user.isVerified) {
    return <Navigate to="/verification" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default RequireAuth;