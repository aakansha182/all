import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserProfile.css';
import SingleBanner from '../components/Banners/SingleBanner';
import UserSidebar from '../components/UserProfile/UserSidebar';
import AccountSettings from '../components/UserProfile/AccountSettings';
import ChangePassword from '../components/UserProfile/ChangePassword';
import YourBooks from '../components/UserProfile/YourBooks';
import WriteBook from '../components/UserProfile/WriteBook';
import Premium from '../components/UserProfile/Premium';
import LegalNotice from '../components/UserProfile/LegalNotice';
import { useParams } from 'react-router-dom';

const UserProfile = () => {
  const { username, activepage } = useParams();
  const [user, setUser] = useState(null);
  const [isPremium, setIsPremium] = useState(false); // State to track premium status

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.post('http://localhost:3001/get-user', { username });
        if (response.data && response.data.user) {
          setUser(response.data.user);
          setIsPremium(response.data.user.isPremium); // Set premium status
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserData();
  }, [username]);

  return (
    <div className="userprofile">
      <SingleBanner
        heading={`My Profile`}
        bannerimage="https://images.unsplash.com/photo-1515542706656-8e6ef17a1521?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
      {/* Display the profile photo at the top */}
      <img
        src={user?.profileimage || '../..assets/explore.png'} // Fallback to a default image if profileimage is not available
        alt="Profile"
        className="userProfilePhoto"
      />
      <div className="userprofilein mt-4">
        <div className="left">
          <UserSidebar activepage={activepage} isPremium={isPremium} />
        </div>
        <div className="right">
          {activepage === 'accountsettings' && <AccountSettings user={user} />}
          {activepage === 'changepassword' && <ChangePassword />}
          {activepage === 'yourbooks' && <YourBooks />}
          {activepage === 'writebook' && isPremium && <WriteBook />}
          {activepage === 'premium' && <Premium />}
          {activepage === 'legalnotice' && <LegalNotice />}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;