import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState({});
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
      setUsername(res.data.username);
    };

    fetchUser();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/api/user/profile`, 
        { username, password },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert('✅ Profile updated!');
    } catch (err) {
      console.error(err);
      alert('❌ Update failed.');
    }
  };

  return (
    <div className="profile-container">
      <h2>👤 Profile</h2>
      <p>Email: {user.email}</p>
      <p>Registered on: {new Date(user.createdAt).toLocaleDateString()}</p>

      <form onSubmit={handleUpdate}>
        <label>Username:
          <input 
            type="text" 
            value={username}
            onChange={(e) => setUsername(e.target.value)} 
          />
        </label>
        <label>New Password:
          <input 
            type="password" 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </label>
        <button type="submit" className="button">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;
