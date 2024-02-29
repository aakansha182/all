import React, { useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import axios from 'axios';
import './AccountSettings.css';

const AccountSettings = ({ user, fetchUserData }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.set('username', user?.username);
    formData.set('profileimage', selectedFile);

    axios.post("http://localhost:3001/upload-user-pfp", formData)
      .then(response => {
        console.log(response);
        fetchUserData(); // Assuming you want to call this after a successful upload
      })
      .catch(error => {
        console.error('Error during the file upload:', error.response || error);
      });
  };

  return (
    <div className='accountsettings'>
      <h1 className='mainhead1'>Personal Information</h1>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='profilePhoto'>Profile Photo <span>*</span></label>
          <input type='file' id='profilePhoto' name='profileimage' onChange={handleFileChange} />
        </div>
        <button type='submit' className='mainbutton1'>Save Changes</button>
      </form>
    </div>
  );
};

// Define PropTypes for AccountSettings component
AccountSettings.propTypes = {
  user: PropTypes.object, // You might want to define more specific shapes for this object
  fetchUserData: PropTypes.func.isRequired,
};

export default AccountSettings;
