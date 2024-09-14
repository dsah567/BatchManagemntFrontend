import React from 'react';
import { useSelector } from 'react-redux';

const Home = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <h1>Welcome, {user?.fullName}!</h1>
      <p>Email: {user?.email}</p>
      <p>User ID: {user?._id}</p>
    </div>
  );
};

export default Home;
