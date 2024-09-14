import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { login } from '../features/authSlice';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    
    try {
      // No need to handle JWT in frontend; it is stored in cookies by backend
      const res=await axios.post('https://batchmanagemntbackend.onrender.com/api/v1/teacher/signin', { email, password }, { withCredentials: true });
      console.log(res.data);
      // Optionally, store user data (without token) in Redux
      dispatch(login({ user:  res.data.user  }));
      navigate('/home');
    } catch (error) {
      console.error('Sign-in failed', error);
    }
  };

  return (
    <form onSubmit={handleSignIn}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Sign In</button>
    </form>
  );
};

export default SignIn;
