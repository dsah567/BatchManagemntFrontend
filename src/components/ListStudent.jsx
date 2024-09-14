import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

const ListStudents = () => {
  const [students, setStudents] = useState([]);
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  const teacherId = user?._id;
  console.log("teachert",teacherId);
  const navigate = useNavigate();

  // Fetch list of students
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        console.log(`/teacher/${teacherId}/students`);
        const response = await axios.get(`https://batchmanagemntbackend.onrender.com/api/v1/teacher/${teacherId}/students`,{ withCredentials: true });
        console.log("res",response.data);
        setStudents(response.data.students);
      } catch (error) {
        console.error('Error fetching students', error);
      }
    };
    fetchStudents();
  }, [teacherId]);

  // Handle delete student
  const handleDelete = async (studentId) => {
    console.log("delet");
    try {
        console.log(`/teacher/${teacherId}/students/${studentId}`);
      await axios.delete(`https://batchmanagemntbackend.onrender.com/api/v1/teacher/${teacherId}/students/${studentId}`,{ withCredentials: true });
      setStudents(students.filter((student) => student._id !== studentId));
    } catch (error) {
      console.error('Error deleting student', error);
    }
  };

  // Redirect to edit page
  const handleEdit = (studentId) => {
    navigate(`/editstudent/${studentId}`);
  };

  return (
    <div>
      <h2>Student List</h2>
      <table>
        <thead>
          <tr>
          <th>Full uid</th>
            <th>Full Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Mobile No</th>
            <th>Subject Batch</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
            <td>{student.uid}</td>
              <td>{student.fullName}</td>
              <td>{student.age}</td>
              <td>{student.gender}</td>
              <td>{student.mobileNo}</td>
              <td>{student.subjectBatch}</td>
              <td>
                <button onClick={() => handleEdit(student._id)}>Edit</button>
                <button onClick={() => handleDelete(student._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListStudents;
