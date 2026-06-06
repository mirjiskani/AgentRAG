import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import DashboardPage from '../pages/Dashboard';

export default function AppRouter() {
  return (
    <Router>
     <Routes>
       <Route path="/" element={<LoginPage/>} />   
       <Route path="/login" element={<LoginPage/>} />
       <Route path="/register" element={<RegisterPage/>} />
       <Route path="/dashboard" element={<DashboardPage/>} />
       {/* Add more routes as needed */}
    </Routes>      
    </Router>
  )
}
