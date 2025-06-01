import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Courses from './pages/Courses';
import Dashboard from './pages/Dashboard';
import VideoPlayer from './pages/VideoPlayer';
import Login from './pages/Login';
import Register from './pages/Register';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/video" element={<VideoPlayer />} />
      </Routes>
    </>
  );
};



const styles = {
  page: {
    padding: '2rem',
    textAlign: 'center',
    fontSize: '1.5rem',
  },
};

export default App;
