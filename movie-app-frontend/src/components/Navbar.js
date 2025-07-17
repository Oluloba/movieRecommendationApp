import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav>
      <button onClick={() => navigate('/dashboard')}>Home</button>
      <button onClick={() => navigate('/profile')}>Profile</button>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default Navbar;
