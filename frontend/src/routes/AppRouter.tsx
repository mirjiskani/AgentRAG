import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import DashboardPage from '../pages/Dashboard';

import ProtectedRoute from './protectedRoutes';
export default function AppRouter() {
  
  return (
    <Router>
     <Routes>
       <Route path="/" element={<LoginPage/>} />   
       <Route path="/login" element={<LoginPage/>} />
       <Route path="/register" element={<RegisterPage/>} />
       <Route path="/dashboard" element={<ProtectedRoute><DashboardPage/></ProtectedRoute>} />
       {/* Add more routes as needed */}
    </Routes>      
    </Router>
  )
}
