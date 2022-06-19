import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Auth from './pages/auth';
import Profile from './pages/profile';
import './index.css';

const App = () => {
  return (
    <div className="flex h-full min-h-screen bg-gray-900">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
