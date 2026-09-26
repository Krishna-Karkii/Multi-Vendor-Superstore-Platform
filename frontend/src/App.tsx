import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import LandingPage from './pages/LandingPage';
import './index.css';

export default function App(){
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/" element={<LandingPage/>}/>
      </Routes>
    </Router>
  );
}
