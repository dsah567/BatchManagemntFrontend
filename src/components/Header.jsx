import React from 'react';
import { Link, useNavigate,NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/authSlice';
import axios from 'axios';
import LinkedinLogo from './assets/linkedin.svg'
import GithubLogo from './assets/github.svg'

const Header = () => {
  const isAuthenticated = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('https://batchmanagemntbackend.onrender.com/api/v1/teacher/logout', {}, { withCredentials: true });
      dispatch(logout());
      navigate('/signin');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <nav className="sticky top-0 bg-gradient-to-r from-green-200 to-blue-200 shadow-md md:text-xl">
    <ul className="flex items-center justify-center space-x-4 p-4">
      {/* Navigation Links */}
      <div className="flex items-center space-x-4">
        {isAuthenticated ? (
          <>
            <li>
              <NavLink to="/home" className={({ isActive }) => (isActive ? 'text-green-600' : 'text-black')}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/addstudent" className={({ isActive }) => (isActive ? 'text-green-600' : 'text-black')}>
                AddStudent
              </NavLink>
            </li>
            <li>
              <NavLink to="/liststudent" className={({ isActive }) => (isActive ? 'text-green-600' : 'text-black')}>
                ListStudent
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={({ isActive }) => (isActive ? 'text-green-600' : 'text-black')}>
                About
              </NavLink>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="text-black hover:text-red-600"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/signin" className={({ isActive }) => (isActive ? 'text-green-600' : 'text-black')}>
                Sign In
              </NavLink>
            </li>
            <li>
              <NavLink to="/signup" className={({ isActive }) => (isActive ? 'text-green-600' : 'text-black')}>
                Sign Up
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={({ isActive }) => (isActive ? 'text-green-600' : 'text-black')}>
                About
              </NavLink>
            </li>
          </>
        )}
      </div>

      {/* Social Icons - Placed on the right side */}
      <div className="flex items-center space-x-4 ">
        <a href="https://www.linkedin.com/in/sahd7929/" target="_blank" rel="noopener noreferrer">
          <img src={LinkedinLogo} alt="LinkedIn" className="w-8" />
        </a>
        <a href="https://github.com/dsah567/BatchManagemntFrontend" target="_blank" rel="noopener noreferrer">
          <img src={GithubLogo} alt="GitHub" className="w-8" />
        </a>
      </div>
    </ul>
  </nav>
);
};

export default Header;
