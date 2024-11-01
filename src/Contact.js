import React, { useState } from 'react';
import './Contact.css';
import emailjs from 'emailjs-com';  // Importing emailjs for handling email submissions

const Contact = () => {
  // State to manage form input values
  const [formData, setFormData] = useState({
    from_name: '',  // Name field, must match emailjs template's field name
    from_email: '', // Email field, must match emailjs template's field name
    subject: '',    // Subject field for the email
    message: '',    // Message content for the email
  });

  // Update form data state when input values change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload on form submission
    const serviceId = 'vigneswaran';         // Your emailjs service ID
    const templateId = 'template_ymavmb5';   // Your emailjs template ID
    const userId = 'fjIXMJ00NzeU0XJ9T';      // Your emailjs user ID

    // Sending the email with emailjs
    emailjs.send(serviceId, templateId, formData, userId)
      .then((result) => {
        console.log('Email sent successfully:', result.text); // Log success message
        alert('Message sent successfully!'); // Alert user on successful email sending
      }, (error) => {
        console.log('Error in sending email:', error.text); // Log error message
        alert('Failed to send message, please try again.');  // Alert user if sending fails
      });
  };

  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        {/* Name field */}
        <div>
          <label>Name:</label>
          <input 
            type="text" 
            name="from_name"  // Must match the placeholder name in emailjs template
            value={formData.from_name} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        {/* Email field */}
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            name="from_email"  // Must match the placeholder email in emailjs template
            value={formData.from_email} 
            onChange={handleChange} 
            required 
          />
        </div>

        {/* Subject field */}
        <div>
          <label>Subject:</label>
          <input 
            type="text" 
            name="subject" 
            value={formData.subject} 
            onChange={handleChange} 
            required 
          />
        </div>

        {/* Message field */}
        <div>
          <label>Message:</label>
          <textarea 
            name="message" 
            value={formData.message} 
            onChange={handleChange} 
            required 
          />
        </div>

        {/* Submit button */}
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default Contact;
