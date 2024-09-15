import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { login } from '../features/authSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
    const {email,password}=values
      try {
        const res=await axios.post('https://batchmanagemntbackend.onrender.com/api/v1/teacher/signin', { email, password }, { withCredentials: true });
        console.log(res.data);
        dispatch(login({ user:  res.data.user  }));
        navigate('/home');
      } catch (error) {
        alert(error.response.data.message)
        console.error('Sign-in failed', error.response.data.message);
        console.error('Sign-in failed', error);
      }
      console.log('Form submitted:', values);
    },
  });


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* Centered Box */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* SignIn Heading */}
        <h1 className="text-4xl font-bold mb-8 text-center">Sign In</h1>

        {/* SignIn Form */}
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label className="block text-xl font-medium mb-2">Email</label>
            <input
              className="w-full p-3 border border-gray-300 rounded-md text-lg"
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
            ) : null}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-xl font-medium mb-2">Password</label>
            <input
              className="w-full p-3 border border-gray-300 rounded-md text-lg"
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
            ) : null}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-md text-lg font-semibold"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
