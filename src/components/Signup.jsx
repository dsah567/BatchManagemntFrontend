import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [gender, setGender] = useState('');
  const [photo, setPhoto] = useState(null); // For file input
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png') && file.size <= 2 * 1024 * 1024) {
      setPhoto(file); // Set photo if valid
    } else {
      alert('Please upload an image in jpg/jpeg/png format under 2MB');
      setPhoto(null);
    }
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    if (!fullName) newErrors.fullName = 'Full Name is required';
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email address is invalid';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }
    if (!age) {
      newErrors.age = 'Age is required';
    } else if (isNaN(age) || age < 18) {
      newErrors.age = 'Age must be a number and at least 18';
    }
    if (!phoneNo) {
      newErrors.phoneNo = 'Phone number is required';
    } else if (!/^\d{10}$/.test(phoneNo)) {
      newErrors.phoneNo = 'Phone number must be 10 digits';
    }
    if (!gender) newErrors.gender = 'Gender is required';
    return newErrors;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('age', age);
    formData.append('phoneno', phoneNo);
    formData.append('gender', gender);
    if(photo){
      console.log("ph",photo);
      formData.append('photo', photo); // Add the photo to formData
    }

    try {
      await axios.post('https://batchmanagemntbackend.onrender.com/api/v1/teacher/signup', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data', // Important for file upload
        },
      });

      navigate('/signin');
    } catch (error) {
      console.log(error.response.data.message);
      alert(error.response.data.message);
      console.error('Sign-up failed', error);
    }
  };

  return (
  
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-4xl font-bold mb-8 text-center">Sign Up</h1>

        <form onSubmit={handleSignUp} encType="multipart/form-data">
          {/* Full Name */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md text-lg"
            />
            {errors.fullName && <span className="text-red-500 text-sm">{errors.fullName}</span>}
          </div>

          {/* Email */}
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md text-lg"
            />
            {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
          </div>

          {/* Password */}
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md text-lg"
            />
            {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
          </div>

          {/* Age */}
          <div className="mb-4">
            <input
              type="number"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md text-lg"
            />
            {errors.age && <span className="text-red-500 text-sm">{errors.age}</span>}
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Phone Number"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md text-lg"
            />
            {errors.phoneNo && <span className="text-red-500 text-sm">{errors.phoneNo}</span>}
          </div>

          {/* Gender */}
          <div className="mb-4">
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md text-lg"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && <span className="text-red-500 text-sm">{errors.gender}</span>}
          </div>

          {/* Profile Photo */}
          <div className="mb-6">
            <input
              type="file"
              accept="image/jpeg, image/png"
              onChange={handlePhotoChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.photo && <span className="text-red-500 text-sm">{errors.photo}</span>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-md text-lg font-semibold hover:bg-blue-600"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );

};

export default SignUp;
