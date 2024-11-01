import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from './firebase';
import './Register.css';

const Register = () => {
  // State to manage form input values
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  // State to manage error messages
  const [error, setError] = useState('');

  // Update form data state when input values change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission for user registration
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents page reload on form submission
    setError('');       // Clears any previous error message

    const auth = getAuth(); // Initialize Firebase Auth instance

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const userId = userCredential.user.uid; // Get the registered user ID

      // Save user data in Firestore with an initialized empty cart
      await setDoc(doc(db, 'users', userId), {
        username: formData.username,
        email: formData.email,
        cart: [] // Initialize empty cart array for new users
      });

      console.log('User registered successfully!');
    } catch (error) {
      setError('Registration failed. Try again.'); // Set error message in state
      console.error('Error registering user:', error);

      // Specific error handling for email already in use
      if (error.code === 'auth/email-already-in-use') {
        alert('This email is already registered. Please use a different email.');
      } else {
        console.error('Error registering user:', error.message);
      }
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        {/* Display error message if any */}
        {error && <p className="error">{error}</p>}

        {/* Username field */}
        <div>
          <label>Username:</label>
          <input 
            type="text" 
            name="username" 
            onChange={handleChange} 
            required 
          />
        </div>

        {/* Email field */}
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            name="email" 
            onChange={handleChange} 
            required 
          />
        </div>

        {/* Password field */}
        <div>
          <label>Password:</label>
          <input 
            type="password" 
            name="password" 
            onChange={handleChange} 
            required 
          />
        </div>

        {/* Submit button */}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
