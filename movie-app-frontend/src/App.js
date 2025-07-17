import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import Profile from './pages/profile';
import PrivateRoute from './routes/PrivateRoute';
import Navbar from './components/Navbar';
import MovieDetails from './pages/MovieDetails';
import Recommendations from './recommendations';
import Favorites from './pages/Favorites';

function App() {
  const token = localStorage.getItem('token');

  return (
    <Router>
      {token && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/recommendations" element={<PrivateRoute><Recommendations /></PrivateRoute>} />
        <Route path="/favorites" element={<PrivateRoute><Favorites /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
}

export default App;
