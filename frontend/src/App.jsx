import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './assets/components/Navbar';
import DashBoard from './assets/pages/DashBoard';
import Focus from './assets/pages/Focus';
import Home from './assets/pages/Home';
import Sessions from './assets/pages/sessions';
import Scheduling from './assets/pages/Scheduling';

function App() {
  return (
    <Router>
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/focus" element={<Focus />} />
        <Route path="/sessions" element={<Sessions />} />
        <Route path="/scheduling" element={<Scheduling />} />
      </Routes>
    </Router>
  );
}

export default App;
