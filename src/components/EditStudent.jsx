import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditStudent = () => {
  const { studentId } = useParams();
  const [studentData, setStudentData] = useState({
    fullName: '',
    age: '',
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
    <div>
      <h2>Edit Student</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name:</label>
          <input
            type="text"
            value={studentData.fullName}
            onChange={(e) => setStudentData({ ...studentData, fullName: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Age:</label>
          <input
            type="number"
            value={studentData.age}
            onChange={(e) => setStudentData({ ...studentData, age: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Mobile No:</label>
          <input
            type="text"
            value={studentData.mobileNo}
            onChange={(e) => setStudentData({ ...studentData, mobileNo: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Subject Batch:</label>
          <input
            type="text"
            value={studentData.subjectBatch}
            onChange={(e) => setStudentData({ ...studentData, subjectBatch: e.target.value })}
            required
          />
        </div>
        <button type="submit">Update Student</button>
      </form>
    </div>
  );
};

export default EditStudent;
