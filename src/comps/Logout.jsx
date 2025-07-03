import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../services/userService';
import '../css-styling/Logout.css';

function Logout() {
    const navigate = useNavigate();

    const handleLogout = () => {
            logoutUser();
            navigate('/login');
        };
    
        return (
            <button className="logout-btn" onClick={handleLogout}>
                Logout
            </button>
    );
    
}

export default Logout;
