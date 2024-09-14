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
          { uid: values.uid }
        );

        if (uidResponse.data.exists) {
            console.log(uidResponse.data.exists);
          toast.success('UID must be unique',{
            position: "top-right",
            
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

        toast.success('Student added successfully!');
        formik.resetForm();
      } catch (error) {
        toast.error(error.response?.data?.error || 'Something went wrong');
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <div className="container">
      <h1>Add Student</h1>
      <form onSubmit={formik.handleSubmit}>
        {/* Full Name */}
        <div>
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.fullName && formik.errors.fullName ? (
            <div className="error">{formik.errors.fullName}</div>
          ) : null}
        </div>

        {/* Age */}
        <div>
          <label>Age</label>
          <input
            type="number"
            name="age"
            value={formik.values.age}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.age && formik.errors.age ? (
            <div className="error">{formik.errors.age}</div>
          ) : null}
        </div>

        <div>
        <label>Gender</label>
        <select
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
        {formik.touched.gender && formik.errors.gender ? <div>{formik.errors.gender}</div> : null}
      </div>
        {/* Mobile Number */}
        <div>
          <label>Mobile Number</label>
          <input
            type="text"
            name="mobileNo"
            value={formik.values.mobileNo}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.mobileNo && formik.errors.mobileNo ? (
            <div className="error">{formik.errors.mobileNo}</div>
          ) : null}
        </div>

        {/* UID */}
        <div>
          <label>UID</label>
          <input
            type="text"
            name="uid"
            value={formik.values.uid}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.uid && formik.errors.uid ? (
            <div className="error">{formik.errors.uid}</div>
          ) : null}
        </div>

        {/* Subject Batch */}
        <div>
          <label>Subject Batch</label>
          <input
            type="text"
            name="subjectBatch"
            value={formik.values.subjectBatch}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.subjectBatch && formik.errors.subjectBatch ? (
            <div className="error">{formik.errors.subjectBatch}</div>
          ) : null}
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Add Student'}
        </button>
      </form>
    </div>
  );
};

export default AddStudent;