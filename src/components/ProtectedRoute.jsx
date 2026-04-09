import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

function ProtectedRoute({ children, adminOnly = false }) {
  const { user, isAdmin } = useAuth();

  if (!user) {
    toast.error('Please login to access this page');
    return <Navigate to="/" replace />;
  }

  if (adminOnly && !isAdmin()) {
    toast.error('Admin access required');
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;