import React, { useState } from "react";
import emailjs from "emailjs-com";
import "./css/FeedbackForm.css"; // Add custom CSS to style the modal

const FeedbackForm = () => {
  const [isOpen, setIsOpen] = useState(false); // To toggle the modal
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    satisfaction: 5,
    message: "",
  });

  // Handle form field change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .send(
        "service_suo8wsp", //  service ID
        "template_l5qrg7x", // Your template ID
        formData,
        "d_zbOietvIGaqa5Fd" // Your public key
      )
      .then((response) => {
        alert("Feedback sent successfully!");
        setIsOpen(false); // Close modal after submission
      })
      .catch((error) => {
        alert("Error sending feedback. Please try again later.");
        console.error("Error:", error);
      });
  };

  return (
    <div>
      {/* Feedback button at the bottom-right */}
      <button className="feedback-btn" onClick={() => setIsOpen(true)}>
        Feedback
      </button>

      {/* Feedback form modal */}
      {isOpen && (
        <div className="feedback-modal">
          <div className="feedback-form-container">
            <button className="close-btn" onClick={() => setIsOpen(false)}>
              &times; {/* Close icon */}
            </button>
            <h2>Feedback Form</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="fullName">Full Name:</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="satisfaction">Satisfaction Level:</label>
                <input
                  type="range"
                  id="satisfaction"
                  name="satisfaction"
                  min="1"
                  max="10"
                  value={formData.satisfaction}
                  onChange={handleInputChange}
                />
                <span>{formData.satisfaction}</span>
              </div>
              <div className="form-group">
                <label htmlFor="message">Message(if any):</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                />
              </div>
              <button type="submit">Submit Feedback</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackForm;
