import React from 'react';
import { useSelector } from 'react-redux';

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  


  return (
    <div className="container mx-auto p-4">
  <div className="flex flex-col-reverse md:flex-row items-center md:items-start">
    {/* Text Section */}
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg mb-4 md:mb-0 md:mr-8 w-full md:w-1/2">
      <h1 className="text-3xl md:text-5xl font-bold mb-4 text-center md:text-left">
        Welcome, {user?.fullName}!
      </h1>
      <p className="text-lg md:text-xl mb-2">Email: {user?.email}</p>
      <p className="text-lg md:text-xl mb-2">Phone No: {user?.phoneno}</p>
      <p className="text-lg md:text-xl mb-2">Age: {user?.age}</p>
      <p className="text-lg md:text-xl">Gender: {user?.gender}</p>
    </div>

  </div>
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
          <h1 className="text-4xl font-bold mb-6 text-center text-blue-600">About Our Batch Management System</h1>
          
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Welcome to our Batch Management System, a dedicated platform that simplifies student management for teachers.
            Our system enables teachers to sign up, log in, and efficiently manage their student records. Teachers can 
            maintain a detailed list of students, add new students, edit student details, and delete students as necessary. 
            Each student is assigned a unique UID (User Identification Number) to ensure every record remains distinct and secure.
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Key Features:</h2>
          <ul className="list-disc pl-5 mb-6 text-lg text-gray-700 leading-relaxed">
            <li><strong>Teacher Sign Up and Log In:</strong> Teachers can securely create accounts and access the system using their credentials.</li>
            <li><strong>Student Management:</strong> Add, edit, and delete student records with essential details like name, age, gender, mobile number, and subject batch.</li>
            <li><strong>Unique Student UID:</strong> Every student is assigned a unique identification number (UID) to maintain uniqueness and prevent duplicate entries.</li>
            <li><strong>Batch Assignments:</strong> Teachers can assign students to specific subject batches and update their details when needed.</li>
          </ul>
          </div>
          </div>
</div>


  );
};

export default Home;
