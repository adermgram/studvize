import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios'; 
import webImage from "../images/image.webp";
import './home.css';
import WelcomePage from './Welcome';

const Home = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [loginData, setLoginData] = useState({ username: "", password: "" });
    const [registrationData, setRegistrationData] = useState({ firstName: "", lastName: "", dob: "", username: "", password: "", confirmPassword: "" });
    const [errorMessage, setErrorMessage] = useState("");
    const [name, setName] = useState("");
    const navigate = useNavigate();
    const [showWelcome, setShowWelcome] = useState(false);

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setLoginData({ username: "", password: "" });
        setRegistrationData({ firstName: "", lastName: "", dob: "", username: "", password: "", confirmPassword: "" });
        setErrorMessage("");
    };

    const handleLoginChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleRegistrationChange = (e) => {
        setRegistrationData({ ...registrationData, [e.target.name]: e.target.value });
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/auth/login", loginData);
            
          
            localStorage.setItem("token", response.data.token);
           
            setLoginData({ username: "", password: "" });
            setName(response.data.user.name);

            setShowWelcome(true);
            setTimeout(() => {
                setShowWelcome(false);
                navigate('/dashboard');
              }, 4000);
        } catch (error) {
            setErrorMessage(error.response?.data?.message || "Login failed. Please try again.");
        }
    };

    const handleRegistrationSubmit = async (e) => {
        e.preventDefault();

        if (registrationData.password !== registrationData.confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        const newUser = {
            name: `${registrationData.firstName} ${registrationData.lastName}`,
            username: registrationData.username,
            password: registrationData.password,
        };

        try {
            await axios.post("http://localhost:5000/users", newUser);
            
            // Clear the form and switch to login
            setRegistrationData({ firstName: "", lastName: "", dob: "", username: "", password: "", confirmPassword: "" });
            toggleForm();
        } catch (error) {
            setErrorMessage(error.response?.data?.message || "Registration failed. Please try again.");
        }
    };

    if (showWelcome) {
        return <WelcomePage username={name} />;
      }

    return (
        <div className="body">
            <div className="home-container">
                <div className="image-container">
                    <img src={webImage} alt="Study" className="image" />
                </div>

                <div className="form-container">
                    {errorMessage && <p className="error-message">{errorMessage}</p>}

                    {isLogin ? (
                        <form id="loginForm" className="reg-form" onSubmit={handleLoginSubmit}>
                            <div className="form-group">
                                <label htmlFor="usernameLogin" className="label">Username:</label>
                                <input
                                    type="text"
                                    id="usernameLogin"
                                    name="username"
                                    value={loginData.username}
                                    onChange={handleLoginChange}
                                    className="input"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="passwordLogin" className="label">Password:</label>
                                <input
                                    type="password"
                                    id="passwordLogin"
                                    name="password"
                                    value={loginData.password}
                                    onChange={handleLoginChange}
                                    className="input"
                                    required
                                />
                            </div>
                            <button type="submit" className="submit-button">Login</button>
                            <div className="toggle-buttons">
                                <button type="button" onClick={toggleForm} className="toggle-button">Sign Up</button>
                            </div>
                        </form>
                    ) : (
                        <form id="registrationForm" className="reg-form" onSubmit={handleRegistrationSubmit}>
                            <div className="form-group">
                                <label htmlFor="firstName" className="label">First Name:</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={registrationData.firstName}
                                    onChange={handleRegistrationChange}
                                    className="input"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName" className="label">Last Name:</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={registrationData.lastName}
                                    onChange={handleRegistrationChange}
                                    className="input"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="dob" className="label">Date of Birth:</label>
                                <input
                                    type="date"
                                    id="dob"
                                    name="dob"
                                    value={registrationData.dob}
                                    onChange={handleRegistrationChange}
                                    className="input"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="usernameSignup" className="label">Username:</label>
                                <input
                                    type="text"
                                    id="usernameSignup"
                                    name="username"
                                    value={registrationData.username}
                                    onChange={handleRegistrationChange}
                                    className="input"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="passwordSignup" className="label">Password:</label>
                                <input
                                    type="password"
                                    id="passwordSignup"
                                    name="password"
                                    value={registrationData.password}
                                    onChange={handleRegistrationChange}
                                    className="input"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="confirmPassword" className="label">Confirm Password:</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={registrationData.confirmPassword}
                                    onChange={handleRegistrationChange}
                                    className="input"
                                    required
                                />
                            </div>
                            <button type="submit" className="submit-button">Register</button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
