import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Register, Login } from './components/Auth';
import { Dashboard } from './pages/Dashboard';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
