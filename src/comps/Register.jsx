import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css-styling/Register.css';
import { registerUser } from '../services/userService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faCheckCircle, faTimes } from '@fortawesome/free-solid-svg-icons';              

function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        phone: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setConfirmPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const validateForm = () => {
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return false;
        }
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        if (!validateForm()) {
            console.log('Form validation failed');
            return;
        }

        try {
            const userData = {
                username: formData.username,
                email: formData.email,
                password: formData.password,
                firstName: formData.firstName,
                lastName: formData.lastName,
                phone: formData.phone
            };

            await registerUser(userData);
            setSuccess(true);
            setTimeout(() => {
                navigate('/login');
            },500);
        } catch (error) {
            console.error("Registration failed:", error);
            setError('Registration failed. Please try again.');
        }
    };

    const togglePasswordVisibility = () => {
        console.log('Password visibility toggled:');
        setShowPassword(!showPassword);
    }
    const toggleConfirmPasswordVisibility = () =>{
        console.log('Password visibility toggled:');
        setConfirmPassword(!showConfirmPassword);
    }

    return (
        <div className="register-container">
            <div className="register-box">
                <h2>Create Account</h2>
                {error && <div className="error-message" style={{color: 'red', marginBottom: '10px'}}>{error}</div>}
                {success && (
                    <div className="success-popup">
                        <FontAwesomeIcon icon={faCheckCircle} className="success-icon" />
                        <div className="success-content">
                            <div className="success-title">Success</div>
                            <div className="success-message">Successfully registered!</div>
                        </div>
                        <button className="close-btn" onClick={() => setSuccess(false)} aria-label="Close">
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                    </div>
                )}
                <form onSubmit={handleSubmit} >
                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                                placeholder="Enter first name"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                                placeholder="Enter last name"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                                placeholder="Choose username"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="Enter email"
                            />
                        </div>
                        <div className="form-group password-group">
                            <label htmlFor="password">Password</label>
                            <div className="password-input-container">
                                <input
                                    type={showPassword ? 'text': 'password'}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    placeholder="Choose password"
                                />
                                <FontAwesomeIcon className="font-icon" style={{cursor:'pointer'}} onClick={togglePasswordVisibility}  icon={ showPassword ? faEyeSlash : faEye} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <div className="password-input-container">
                                <input
                                    type={showConfirmPassword ? 'text': 'password'}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    placeholder="Confirm password"
                                />
                                <FontAwesomeIcon className="font-icon" style={{cursor:'pointer'}} onClick={toggleConfirmPasswordVisibility}  icon={ showConfirmPassword ? faEyeSlash : faEye} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                placeholder="Enter phone number"
                            />
                        </div>
                    </div>
                    <button type="submit">Create Account</button>
                </form>
                <p>
                    Already have an account? <span 
                        onClick={() => navigate('/login')} 
                        className="login-link">
                        Sign in
                    </span>
                </p>
            </div>
        </div>
    );
}

export default Register;