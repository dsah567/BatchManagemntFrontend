import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const AddStudent = ({ teacherId }) => {
    const { user } = useSelector((state) => state.auth);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form validation schema using Yup
  const validationSchema = Yup.object({
    fullName: Yup.string().required('Full Name is required'),
    age: Yup.number()
      .required('Age is required')
      .min(5, 'Minimum age is 5')
      .max(100, 'Maximum age is 100'),
      gender: Yup.string()
      .oneOf(['Male', 'Female', 'Other'], 'Gender is required')
      .required('gender is required'),
    mobileNo: Yup.string()
      .required('Mobile number is required')
      .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits'),
    uid: Yup.string().required('UID is required'),
    subjectBatch: Yup.string().required('Subject Batch is required'),
  });

  // Formik for form state management
  const formik = useFormik({
    initialValues: {
      fullName: '',
      age: '',
      gender:"",
      mobileNo: '',
      uid: '',
      subjectBatch: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setIsSubmitting(true);
        //Check if UID is unique by making a request to the backend
        const uidResponse = await axios.post(
          `https://batchmanagemntbackend.onrender.com/api/v1/teacher/checkuid`,
          { uid: values.uid },{ withCredentials: true }
        );

        if (uidResponse.data.exists) {
          alert('UID already exists, must be unique.', {
            position: 'top-right',
          });
          setIsSubmitting(false);
          return;
        }

        // Make request to add student
        const response = await axios.post(
          `https://batchmanagemntbackend.onrender.com/api/v1/teacher/${user._id}/students`,
          values,
          { withCredentials: true } // To send credentials like cookies
        );

        toast.success('Student added successfully!', {
          position: 'top-right'}
          );
        formik.resetForm();
      } catch (error) {
        toast.error(error.response?.data?.error || 'Something went wrong');
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <div className="container mx-auto p-4">
    <h1 className="text-2xl font-bold mb-4 text-center md:text-4xl">Add Student</h1>
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      <div className="flex flex-col md:flex-row md:space-x-4">
        {/* Full Name */}
        <div className="w-full md:w-1/2">
          <label className="block text-lg font-medium mb-2">Full Name</label>
          <input
            className="w-full p-2 border border-gray-300 rounded-md"
            type="text"
            name="fullName"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.fullName && formik.errors.fullName ? (
            <div className="text-red-500 text-sm">{formik.errors.fullName}</div>
          ) : null}
        </div>
  
        {/* Age */}
        <div className="w-full md:w-1/2">
          <label className="block text-lg font-medium mb-2">Age</label>
          <input
            className="w-full p-2 border border-gray-300 rounded-md"
            type="number"
            name="age"
            value={formik.values.age}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.age && formik.errors.age ? (
            <div className="text-red-500 text-sm">{formik.errors.age}</div>
          ) : null}
        </div>
      </div>
  
      {/* Gender */}
      <div>
        <label className="block text-lg font-medium mb-2">Gender</label>
        <select
          className="w-full p-2 border border-gray-300 rounded-md"
          name="gender"
          value={formik.values.gender}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          <option value="" label="Select gender" />
          <option value="Male" label="Male" />
          <option value="Female" label="Female" />
          <option value="Other" label="Other" />
        </select>
        {formik.touched.gender && formik.errors.gender ? (
          <div className="text-red-500 text-sm">{formik.errors.gender}</div>
        ) : null}
      </div>
  
      {/* Mobile Number */}
      <div>
        <label className="block text-lg font-medium mb-2">Mobile Number</label>
        <input
          className="w-full p-2 border border-gray-300 rounded-md"
          type="text"
          name="mobileNo"
          value={formik.values.mobileNo}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.mobileNo && formik.errors.mobileNo ? (
          <div className="text-red-500 text-sm">{formik.errors.mobileNo}</div>
        ) : null}
      </div>
  
      {/* UID */}
      <div>
        <label className="block text-lg font-medium mb-2">UID</label>
        <input
          className="w-full p-2 border border-gray-300 rounded-md"
          type="text"
          name="uid"
          value={formik.values.uid}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.uid && formik.errors.uid ? (
          <div className="text-red-500 text-sm">{formik.errors.uid}</div>
        ) : null}
      </div>
  
      {/* Subject Batch */}
      <div>
        <label className="block text-lg font-medium mb-2">Subject Batch</label>
        <input
          className="w-full p-2 border border-gray-300 rounded-md"
          type="text"
          name="subjectBatch"
          value={formik.values.subjectBatch}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.subjectBatch && formik.errors.subjectBatch ? (
          <div className="text-red-500 text-sm">{formik.errors.subjectBatch}</div>
        ) : null}
      </div>
  
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded-md w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Add Student'}
      </button>
    </form>
  </div>
  
  );
};

export default AddStudent;