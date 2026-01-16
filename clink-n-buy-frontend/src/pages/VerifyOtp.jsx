import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import API from '../API';

const VerifyOtp = () => {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email; // Get email passed from Register page

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/verify-otp', { email, otp });
      alert("Account Verified! You can now login.");
      navigate('/login');
    } catch (err) {
      alert("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleVerify} className="p-10 bg-white rounded-xl shadow-lg w-96 text-center">
        <h2 className="text-2xl font-bold mb-4">Verify Your Account</h2>
        <p className="text-gray-600 mb-6">Enter the OTP sent to {email}</p>
        <input 
          type="text" placeholder="Enter 6-digit OTP" 
          className="w-full p-3 mb-6 border rounded text-center text-2xl tracking-widest"
          onChange={(e) => setOtp(e.target.value)}
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded font-bold">
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default VerifyOtp;