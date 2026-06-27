import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { Suspense } from 'react';
import ProtectedRoute from './protectedRoutes';

const LoginPage = React.lazy(() => import('../pages/LoginPage'));
const RegisterPage = React.lazy(() => import('../pages/RegisterPage'));
const DashboardPage = React.lazy(() => import('../pages/Dashboard'));

export default function AppRouter() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        </Routes>
      </Suspense>
    </Router>
  );
}
