import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import Navbar from '../components/Navbar';
import './dashboard.css';

function DashBoard() {
    const [tasks, setTasks] = useState([]);

    const completedTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        setTasks(storedTasks);
    }, []);

    return (
        <div>
           
            <Navbar />
            <div className="dashboard">
                <h2 className="dashboard-heading">Welcome to Your Dashboard</h2>
                <p className="dashboard-text">Select a feature from the navigation bar to get started!</p>

                {/* Progress Tracking Section */}
                <div className="progress-tracking">
                    <h3 className="progress-heading">Progress Tracking</h3>
                    <div className="progress">
                        <p>Completed Tasks: <span>{completedTasks}</span></p>
                        <p>Total Tasks: <span>{totalTasks}</span></p>
                        {totalTasks === 0 ? (
                            <div style={{ color: '#ff0000' }}>
                                <p>No tasks available. Please add some tasks.</p>
                            </div>
                        ) : (
                            <div className="progress-bar">
                                <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashBoard;
