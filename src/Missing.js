import React from 'react';
import './Missing.css'; // Import the CSS file for styling

const Missing = () => {
  return (
    <div className="not-found-container"> {/* Container for the 404 message */}
      <h1>404 Not Found</h1> {/* Main heading indicating the error */}
      <p>Sorry, the page you are looking for does not exist.</p> {/* Message for the user */}
    </div>
  );
};

export default Missing; // Export the Missing component
