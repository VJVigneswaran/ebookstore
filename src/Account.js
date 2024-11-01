import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import './Account.css';

const Account = () => {
  // State to keep track of the logged-in user
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // useEffect hook to listen for authentication state changes
  useEffect(() => {
    // Subscribe to onAuthStateChanged listener, updates 'user' state if auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      // If user is logged in, ensure they are on the account page
      if (currentUser) {
        navigate('/account');
      } 
    });
    // Clean up the listener on component unmount
    return () => unsubscribe();
  }, [navigate]);

  // Function to handle sign-out action
  const handleSignOut = async () => {
    try {
      // Firebase function to sign the user out
      await signOut(auth);
      setUser(null); // Clear user state after signing out
      navigate('/'); // Optionally redirect to the homepage or another page
      alert('Signed out successfully');
    } catch (error) {
      console.error('Error signing out:', error); // Log any errors
    }
  };

  return (
    <div className="account-container">
      <h2>Account</h2>
      {user ? (
        <>
          {/* Display a welcome message for the logged-in user */}
          <p className="welcome-message">Welcome, {user.displayName || user.email}!</p>
          {/* Sign-out button to log the user out */}
          <button className="sign-out-button" onClick={handleSignOut}>
            Sign Out
          </button>
        </>
      ) : (
        <div className="auth-options">
          {/* Show registration and login options for users who aren't logged in */}
          <p>New user? <Link to="/register" className="auth-link">Register here</Link></p>
          <p>Already have an account? <Link to="/login" className="auth-link">Log in</Link></p>
        </div>
      )}
    </div>
  );
};

export default Account;
