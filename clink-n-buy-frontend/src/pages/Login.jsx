import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import API from '../API'; 

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('/auth/login', formData);
      
      // Based on your backend structure: response.data.data contains the info
      const userData = {
        token: response.data.data.token,
        role: response.data.data.role,   // Capturing ROLE_SELLER
        email: response.data.data.email
      };

      login(userData); 
      alert("Login Success!");
      window.location.href = "#/"; 
    } catch (err) {
      alert("Error: " + (err.response?.data?.message || "Login Failed"));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-10 bg-white rounded-xl shadow-2xl w-96">
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
        <input 
          type="email" placeholder="Email" required
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
        <input 
          type="password" placeholder="Password" required
          className="w-full p-3 mb-6 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setFormData({...formData, password: e.target.value})}
        />
        <button className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 transition">
          Login to ClinkNBuy
        </button>
      </form>
    </div>
  );
};

export default Login;