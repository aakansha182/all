import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using react-router for navigation
import './SuccessPage.css'; // Import CSS file for styling

const SuccessPage = () => {
  return (
    <div className="success-container">
      <div className="videoDiv">
        {/* Embed the GIF using an img tag */}
        <img src="/assests/booksanime-ezgif.com-crop.gif" alt="Logo Image" className="absolut" />
      </div>
      <div className="quote-container">
        <div className="success-content">
          <h2>Subscription Successful!</h2>
          <p>Thank you for subscribing. </p>
          <p>You are now a premium member </p> <p> Have full access to premium features:)</p>
        </div>
        <p className="quote-text">"Reading is a passport to countless adventures."</p>
      </div>
    </div>
  );
};

export default SuccessPage;
