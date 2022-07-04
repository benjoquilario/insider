import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Auth from './pages/auth';
import Profile from './pages/profile';
import Followers from './pages/followers';
import ProtectedRoutes from './pages/protected/ProtectedRoute';
import Layout from './pages/layout/layout';
import './index.css';

const App = () => {
  return (
    <div className="flex h-full min-h-screen bg-gray-900">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route element={<ProtectedRoutes />}>
              <Route path="/" element={<Home />} />
              <Route path="home" element={<Home />} />
              <Route path="profile/:id" element={<Profile />} />
              <Route path="followers" element={<Followers />} />
            </Route>
          </Route>
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
