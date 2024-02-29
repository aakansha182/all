// ChangePassword.jsx

import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios'; // Import axios for making HTTP requests

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [userId, setUserId] = useState('');

    useEffect(() => {
        // Fetch user ID from the backend when the component mounts
        const fetchUserId = async () => {
            try {
                const response = await axios.get('/getUserId'); // Adjust the endpoint to fetch user ID
                setUserId(response.data.userId); // Assuming the response has a property 'userId'
            } catch (error) {
                console.error('Error fetching user ID:', error);
            }
        };

        fetchUserId();
    }, []);

    const handleSaveChanges = async () => {
        try {
            if (newPassword.length < 6) {
                setError('Password must be at least 6 characters long.');
                return;
            }

            if (newPassword !== confirmPassword) {
                setError('Passwords do not match.');
                return;
            }

            const response = await axios.post("/changing-password", {
                userId,
                oldPassword,
                newPassword,
            });

            if (response.data.message === 'Password changed successfully') {
                alert('Password successfully changed');
                // Redirect or perform any other action upon successful password change
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            console.error('Error changing password:', error);
            setError('An error occurred while changing the password.');
        }
    };

    return (
        <div className='accountsettings'>
            <h1 className='mainhead1'>Change Password</h1>

            <div className='form'>
                <div className='form-group'>
                    <label htmlFor='oldpass'>Old Password <span>*</span></label>
                    <div className="password-input-container">
                        <input
                            type={showOldPassword ? 'text' : 'password'}
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            style={{ backgroundColor: 'black', color: 'gray' }}
                        />
                        <div className="eye-icon" onClick={() => setShowOldPassword(!showOldPassword)}>
                            {showOldPassword ? <FaEyeSlash /> : <FaEye />}
                        </div>
                    </div>
                </div>

                <div className='form-group'>
                    <label htmlFor='newpass'>New Password <span>*</span></label>
                    <div className="password-input-container">
                        <input
                            type={showNewPassword ? 'text' : 'password'}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            style={{ backgroundColor: 'black', color: 'gray' }}
                        />
                        <div className="eye-icon" onClick={() => setShowNewPassword(!showNewPassword)}>
                            {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                        </div>
                    </div>
                </div>

                <div className='form-group'>
                    <label htmlFor='confirmpass'>Confirm Password <span>*</span></label>
                    <div className="password-input-container">
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            style={{ backgroundColor: 'black', color: 'gray' }}
                        />
                        <div className="eye-icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </div>
                    </div>
                </div>

                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>

            <button className='mainbutton1' onClick={handleSaveChanges}>Save Changes</button>
        </div>
    );
};

export default ChangePassword;
