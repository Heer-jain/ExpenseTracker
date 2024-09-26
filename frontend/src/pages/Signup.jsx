import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

const Signup = () => {
  const [signupInfo, setSignupInfo] = useState({
    username: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const copySignupInfo = { ...signupInfo };
    copySignupInfo[name] = value;
    setSignupInfo(copySignupInfo);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const url = 'http://localhost:3000/auth/signup';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signupInfo)
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        return handleError(errorResponse.error);
      }
      const result = await response.json();
      const { success, message, error } = result;

      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate('/login');
        }, 1000);
      } else {
        return handleError(error);
      }
    } catch (err) {
      return handleError('Server error. Please try again later.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSignup}>
        <div className="flex items-center justify-center min-h-screen bg-[#f8f9fa] text-[#007bff]">
          <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-md rounded-lg">
            <h2 className="text-4xl font-bold text-center">Sign Up</h2>
            <div>
              <label htmlFor="username" className="block font-medium text-text">Username</label>
              <input 
                onChange={handleChange} 
                type="text" 
                id="username" 
                name="username" 
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-primary" 
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block font-medium text-text">Email</label>
              <input 
                onChange={handleChange} 
                type="email" 
                id="email" 
                name="email" 
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-primary" 
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block font-medium text-text">Password</label>
              <input 
                onChange={handleChange} 
                type="password" 
                id="password" 
                name="password" 
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-primary" 
                required
              />
            </div>
            <button 
              type="submit" 
              className="w-full px-4 py-2 font-medium bg-primary rounded-md hover:bg-primary-dark focus:outline-none focus:ring focus:ring-primary text-[#f8f9fa] bg-[#007bff]"
            >
              Sign Up
            </button>
            <p className="text-sm text-center">
              Already have an account? <Link to="/login" className="font-medium hover:text-primary-dark hover:underline">Login</Link>
            </p>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signup;
