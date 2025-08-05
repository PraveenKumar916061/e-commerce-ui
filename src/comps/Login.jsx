import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css-styling/Login.css';
import {loginUser}from '../services/userService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser,faLock, faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle, faTimes } from '@fortawesome/free-solid-svg-icons';


function Login() {
    const [loginRequest, setLoginRequest] = useState({
        username: '',
        password: ''
    });
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginRequest(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);
        try {
            await loginUser(loginRequest);
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                navigate('/dashboard');
            }, 1500);
        } catch (error) {
            console.error('Login error:', error);
            setError(error.message || 'Invalid username or password. Please try again.');

        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Welcome</h2>
                {error && <div className="error-message" style={{color: 'red', marginBottom: '10px'}}>{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={loginRequest.username}
                            onChange={handleChange}
                            required
                            placeholder="Enter your username"
                        />
                        <FontAwesomeIcon className="font-lock" icon={faUser} />
                    </div>
                    <div className="form-group" style={{position: 'relative'}}>
                        <label htmlFor="password">Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            value={loginRequest.password}
                            onChange={handleChange}
                            required
                            placeholder="Enter your password"
                        />
                        <FontAwesomeIcon className="font-lock" icon={faLock} />
                        <button
                            type="button"
                            className="toggle-password"
                            onClick={() => setShowPassword((prev) => !prev)}
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                        </button>
                    </div>
                    
                    <button type="submit">Sign In</button>
                </form>
                <p>
                    New user? <span 
                        onClick={() => navigate('/register')} 
                        className="register-link">
                        Create an account
                    </span>
                </p>
            </div>
            {success && (
                <div className="success-popup">
                    <FontAwesomeIcon icon={faCheckCircle} className="success-icon" />
                    <div className="success-content">
                        <div className="success-title">Success</div>
                        <div className="success-message">Login successful!</div>
                    </div>
                    <button className="close-btn" onClick={() => setSuccess(false)} aria-label="Close">
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>
            )}
        </div>
    );
}

export default Login;