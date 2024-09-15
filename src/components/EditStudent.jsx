import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditStudent = () => {
  const { studentId } = useParams();
  const [studentData, setStudentData] = useState({
    fullName: '',
    age: '',
    gender:'',
    mobileNo: '',
    subjectBatch: '',
  });
  const navigate = useNavigate();

  // Fetch the student data on load
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(`https://batchmanagemntbackend.onrender.com/api/v1/teacher/student/${studentId}`, { withCredentials: true });
        console.log(response.data.student);
        setStudentData(response.data.student);
      } catch (error) {
        console.error('Error fetching student data', error);
      }
    };
    fetchStudentData();
  }, [studentId]);

  // Handle form submission for editing student
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://batchmanagemntbackend.onrender.com/api/v1/teacher/students/${studentId}`, studentData, { withCredentials: true });
      navigate('/liststudent'); // Redirect back to student list after edit
    } catch (error) {
      console.error('Error updating student', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
    <h1 className="text-2xl font-bold mb-4 text-center md:text-4xl">Edit Student</h1>
      <form onSubmit={handleSubmit}className="space-y-6">
      <div className="flex flex-col md:flex-row md:space-x-4">
      <div className="w-full md:w-1/2">
          <label className="block text-lg font-medium mb-2">Full Name:</label>
          <input
          className="w-full p-2 border border-gray-300 rounded-md"
            type="text"
            value={studentData.fullName}
            onChange={(e) => setStudentData({ ...studentData, fullName: e.target.value })}
            required
          />
        </div>
        </div>

        <div className="w-full md:w-1/2">
          <label className="block text-lg font-medium mb-2">Age:</label>
          <input
          className="w-full p-2 border border-gray-300 rounded-md"
            type="number"
            value={studentData.age}
            onChange={(e) => setStudentData({ ...studentData, age: e.target.value })}
            required
          />
        </div>

        <div>
        <label className="block text-lg font-medium mb-2">Gender</label>
        <select
          className="w-full p-2 border border-gray-300 rounded-md"
         value={studentData.gender} onChange={(e) => setStudentData({ ...studentData, gender: e.target.value })}>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
      </div>

      <div>
        <label className="block text-lg font-medium mb-2">Mobile Number</label>
        <input
          className="w-full p-2 border border-gray-300 rounded-md"
            type="text"
            value={studentData.mobileNo}
            onChange={(e) => setStudentData({ ...studentData, mobileNo: e.target.value })}
            required
          />
        </div>

        <div>
        <label className="block text-lg font-medium mb-2">Subject Batch</label>
        <input
          className="w-full p-2 border border-gray-300 rounded-md"
            type="text"
            value={studentData.subjectBatch}
            onChange={(e) => setStudentData({ ...studentData, subjectBatch: e.target.value })}
            required
          />
        </div>
        <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded-md w-full"
        >Update Student</button>
      </form>
    </div>
  );
};

export default EditStudent;
