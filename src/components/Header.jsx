import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/authSlice';
import axios from 'axios';

const Header = () => {
  const isAuthenticated = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('/api/v1/teacher/logout', {}, { withCredentials: true });
      dispatch(logout());
      navigate('/signin');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <nav>
      <ul>
        {isAuthenticated ? (
          <>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/signin">Sign In</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
            <li><Link to="/about">About</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Header;
