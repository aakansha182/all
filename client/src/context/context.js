// src/context/UserContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios'; // Assuming you're fetching user data from an API

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Replace with your actual API call
                const response = await axios.get('/api/user/info');
                setUser(response.data); // Set user data
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
