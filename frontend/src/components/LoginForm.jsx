import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/api';
import { loginSuccess } from '../features/authSlice';
import { toast } from 'react-toastify';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/auth/login', formData);
      dispatch(loginSuccess(response.data.token));
      localStorage.setItem('token', response.data.token);
      toast.success('Login successful');
      navigate('/'); // Navigate to the home page after login
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error logging in');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Username:</label>
            <input 
              type="text" 
              name="username" 
              value={formData.username} 
              onChange={handleChange} 
              required 
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password:</label>
            <input 
              type="password" 
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              required 
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <button 
            type="submit" 
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Login
          </button>
          <p className="mt-4 text-center">
            Create a new account? 
            <Link to="/register" className="text-blue-500 hover:underline ml-1">Click here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
