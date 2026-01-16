import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../API';

const Register = () => {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    mobile: '', // Added mobile to state
    role: 'USER' 
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sending the complete DTO including mobile
      await API.post('/auth/register', formData);
      alert("OTP sent to your email!");
      navigate('/verify-otp', { state: { email: formData.email } }); 
    } catch (err) {
      // Specifically catching the 409/DataExists error
      alert("Registration Failed: " + (err.response?.data?.message || "Error occurred"));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-8 bg-white rounded-xl shadow-2xl w-96 my-10">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Join ClinkNBuy</h2>
        
        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
        <input 
          type="text" placeholder="John Doe" required
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          onChange={(e) => setFormData({...formData, name: e.target.value})}
        />
        
        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
        <input 
          type="email" placeholder="john@example.com" required
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />

        <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
        <input 
          type="tel" placeholder="9876543210" required
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          onChange={(e) => setFormData({...formData, mobile: e.target.value})}
        />
        
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input 
          type="password" placeholder="********" required
          className="w-full p-3 mb-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          onChange={(e) => setFormData({...formData, password: e.target.value})}
        />
        <p className="text-[10px] text-gray-500 mb-4 ml-1">
          8+ chars, 1 Uppercase, 1 Lowercase, 1 Number, 1 Special Char.
        </p>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Sign up as:</label>
          <select 
            value={formData.role}
            className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none bg-white"
            onChange={(e) => setFormData({...formData, role: e.target.value})}
          >
            <option value="USER">Customer</option>
            <option value="SELLER">Seller</option>
          </select>
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 transition duration-300 shadow-lg">
          Create Account
        </button>
      </form>
    </div>
  );
};

export default Register;