import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './welcome.css';

const WelcomePage = ({ username }) => {
  const navigate = useNavigate();
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start the fade-out animation after 3 seconds
    const timer = setTimeout(() => {
      setFadeOut(true);
    }, 3000);

    // Redirect to the dashboard after 4 seconds
    const redirectTimer = setTimeout(() => {
      navigate('/dashboard');
    }, 4000);

    return () => {
      clearTimeout(timer);
      clearTimeout(redirectTimer);
    };
  }, [navigate]);

  return (
    <div className={`welcome-container ${fadeOut ? 'fade-out' : ''}`}>
      <h1 className="welcome-message">Welcome, {username}!</h1>
    </div>
  );
};

export default WelcomePage;
