import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { login } from './features/authSlice';
import axios from 'axios';

import SignIn from './components/Signin';
import SignUp from './components/Signup';
import About from './components/About';
import Home from './components/Home';
import Header from './components/Header';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user); // Check for user info in Redux

  // On component mount, check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Call an endpoint to verify if the user is logged in
        const { data } = await axios.get('https://batchmanagemntbackend.onrender.com/api/v1/teacher/me', { withCredentials: true });
        
        if (data && data.user) {
          // If the user is authenticated, store their info in Redux
          dispatch(login({ user: data.user }));
        }
      } catch (error) {
        console.log('User is not authenticated');
      }
    };

    checkAuth();
  }, [dispatch]);

  return (
    <Router>
      <Header />
      <Routes>
        {/* Public Routes */}
        <Route path="/signin" element={user ? <Navigate to="/home" /> : <SignIn />} />
        <Route path="/signup" element={user ? <Navigate to="/home" /> : <SignUp />} />
        <Route path="/about" element={<About />} />

        {/* Protected Routes */}
        <Route path="/home" element={user ? <Home /> : <Navigate to="/signin" />} />

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to={user ? '/home' : '/signin'} />} />
      </Routes>
    </Router>
  );
};

export default App;
