import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard'; // Dashboard component
import AdminDashboard from './AdminDashboard'; // Admin Dashboard component
import SubscriptionPage from './SubscriptionPage';
import AdminSubscriptionPage from './AdminSubscriptionPage'; // Admin Subscription Page
import Category from './category';
import Content from './Content';
import WatchPage from './WatchPage';  // Import WatchPage
import InfoPage from './InfoPage';    // Import InfoPage
import ContentPage from "./ContentPage";
import ComingSoonPage from "./ComingSoonPage";
import AdminMainPage from './MainAdminPage'; // Import AdminMainPage

import './App.css';

// Protected Route for authenticated users
const ProtectedRoute = ({ element, userData }) => {
  return userData ? element : <Navigate to="/login" />;
};

// Admin Protected Route for users with admin privileges
const AdminProtectedRoute = ({ element, userData }) => {
  return userData && userData.role === "ROLE_ADMIN" ? element : <Navigate to="/" />;
};

function App() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in when the app starts
  useEffect(() => {
    const stored = localStorage.getItem('userData');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUserData(parsed);
      } catch (e) {
        console.error('Error parsing stored userData:', e);
        localStorage.removeItem('userData');
      }
    }
    setLoading(false);
  }, []);

  const handleLoginSuccess = (data) => {
    setUserData(data);
    localStorage.setItem('userData', JSON.stringify(data)); // Store user data in localStorage for persistence
  };

  const handleLogout = () => {
    setUserData(null);
    localStorage.clear();
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading spinner or text
  }

  return (
    <Router>
      <Routes>
        {/* Login route */}
        <Route
          path="/login"
          element={<Login onLoginSuccess={handleLoginSuccess} />}
        />

        {/* Register route */}
        <Route
          path="/register"
          element={<Register />}
        />

        {/* Dashboard route */}
        <Route
          path="/"
          element={
            <ProtectedRoute
              element={<Dashboard userData={userData} onLogout={handleLogout} />}
              userData={userData}
            />
          }
        />

        {/* Admin Dashboard route */}
        <Route
          path="/admin"
          element={
            <AdminProtectedRoute
              element={<AdminDashboard userData={userData} />}
              userData={userData}
            />
          }
        />

        {/* Admin Subscription page route */}
        <Route
          path="/admin/subscription"
          element={
            <AdminProtectedRoute
              element={<AdminSubscriptionPage userData={userData} />}
              userData={userData}
            />
          }
        />

        {/* Category Management route */}
        <Route
          path="/admin/manage-categories"
          element={
            <AdminProtectedRoute
              element={<Category />}
              userData={userData}
            />
          }
        />

        {/* Content Management route */}
        <Route
          path="/admin/content"
          element={
            <AdminProtectedRoute
              element={<Content />}
              userData={userData}
            />
          }
        />
           {/* Admin mainpage route */}
        <Route
          path="/admin-main-page"
          element={
            <AdminProtectedRoute
              element={<AdminMainPage userData={userData} />}
              userData={userData}
            />
          }
        />
 

        {/* SubscriptionPage route */}
        <Route
          path="/subscription"
          element={<SubscriptionPage />}
        />
         {/* contentPage route */}
        <Route
          path="/ContentPage"
          element={<ContentPage />}
        />
        

        {/* Watch Page route */}
        <Route
          path="/watch/:movieName"
          element={<WatchPage />}
        />

        {/* Info Page route */}
        <Route
          path="/info/:movieName"
          element={<InfoPage />}
        />
        <Route
          path="/coming-soon"
          element={<ComingSoonPage />}
        />
      
        
       

        {/* Fallback for invalid routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
