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
import AddStudent from './components/AddStudent';
import EditStudent from './components/EditStudent';
import ListStudents from './components/ListStudent';


const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  // On component mount, check if user is already logged in
  useEffect(() => {

    const checkAuth = async () => {
      console.log("app");
      try {
        // Call an endpoint to verify if the user is logged in
        const { data } = await axios.get('https://batchmanagemntbackend.onrender.com/api/v1/teacher/me', { withCredentials: true });
        console.log("data");
        console.log("data",data);
        if (data && data.user) {
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
        <Route path="/signin" element={user ? <Home/>: <SignIn />} />
        <Route path="/signup" element={user ?<Home/>: <SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/" element={<About />} />

        {/* Protected Routes */}
        <Route path="/home" element={user ? <Home />: <SignIn/> } />
        <Route path="/addstudent" element={user ? <AddStudent/>: <SignIn/> } />
        <Route path="/liststudent" element={user ? <ListStudents/>: <SignIn/> } />
        <Route path="/editstudent/:studentId" element={user ? <EditStudent/>: <SignIn/> } />

      </Routes>
    </Router>
  );
};

export default App;
