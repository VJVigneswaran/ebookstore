import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  // State to manage form input values
  const [formData, setFormData] = useState({ email: '', password: '' });
  // State to manage error messages
  const [error, setError] = useState('');
  // State to manage loading state during login
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Update form data state when input values change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission for user login
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents page reload on form submission
    setError(''); // Clears any previous error message
    setLoading(true); // Set loading to true while processing login
    const auth = getAuth(); // Initialize Firebase Auth instance

    try {
      // Sign in user with email and password
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      const userId = userCredential.user.uid; // Get the logged-in user ID

      // Fetch user data from Firestore using the user ID
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        console.log('User data:', userDoc.data());
        // Optionally save this data in state/context for future use
        navigate('/account'); // Navigate to the account page upon successful login
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      setError('Login failed. Please check your email and password.'); // Set error message in state
      console.error('Error logging in user:', error);
    } finally {
      setLoading(false); // Set loading back to false after login completes
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        {/* Display error message if any */}
        {error && <p className="error">{error}</p>}

        {/* Email input field */}
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            name="email" 
            onChange={handleChange} 
            required 
          />
        </div>

        {/* Password input field */}
        <div>
          <label>Password:</label>
          <input 
            type="password" 
            name="password" 
            onChange={handleChange} 
            required 
          />
        </div>

        {/* Submit button with loading state */}
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>

        {/* Loading message during login process */}
        {loading && <p className="loading-message">Please wait, logging in...</p>}
      </form>
    </div>
  );
};

export default Login;
