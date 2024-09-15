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
    <div className="p-6">
  <h2 className="text-2xl font-bold text-center mb-4 text-blue-600">Student List</h2>
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white rounded-lg shadow-lg border border-gray-300">
      <thead className="bg-gray-100">
        <tr>
          <th className="text-left py-3 px-4 uppercase font-semibold text-sm">UID</th>
          <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Full Name</th>
          <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Age</th>
          <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Gender</th>
          <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Mobile No</th>
          <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Subject Batch</th>
          <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Actions</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <tr key={student._id} className="border-t border-gray-200 hover:bg-gray-100">
            <td className="py-3 px-4">{student.uid}</td>
            <td className="py-3 px-4">{student.fullName}</td>
            <td className="py-3 px-4">{student.age}</td>
            <td className="py-3 px-4">{student.gender}</td>
            <td className="py-3 px-4">{student.mobileNo}</td>
            <td className="py-3 px-4">{student.subjectBatch}</td>
            <td className="py-3 px-4">
              <button 
                className="bg-blue-500 text-white font-bold py-1 px-3 rounded mr-2 hover:bg-blue-600"
                onClick={() => handleEdit(student._id)}
              >
                Edit
              </button>
              <button 
                className="bg-red-500 text-white font-bold py-1 px-3 rounded hover:bg-red-600"
                onClick={() => handleDelete(student._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  );
};

export default ListStudents;
