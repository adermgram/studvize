import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import './focus.css';

function Focus ()  {
    // Reminder state and Pomodoro state
    const [reminders, setReminders] = useState([]);
    const [reminderName, setReminderName] = useState('');
    const [reminderTime, setReminderTime] = useState('');
    const [isPaused, setIsPaused] = useState(true);
    const [timeLeft, setTimeLeft] = useState(25 * 60); // Default 25 minutes
    const [customTime, setCustomTime] = useState('');
    const alarmSound = new Audio('/sounds/sound.mp3'); // Path to your sound file

 
    // Load reminders from local storage on initial render
    useEffect(() => {
        const storedReminders = JSON.parse(localStorage.getItem('reminders')) || [];
        setReminders(storedReminders);
    }, []);

    // Save reminders to local storage whenever they change
    useEffect(() => {
        localStorage.setItem('reminders', JSON.stringify(reminders));
    }, [reminders]);

    // Add a new reminder
    const addReminder = () => {
        if (!reminderName || !reminderTime) return;
        setReminders([...reminders, { name: reminderName, time: reminderTime }]);
        setReminderName('');
        setReminderTime('');
    };

    // Delete a reminder
    const deleteReminder = (index) => {
        const updatedReminders = reminders.filter((_, i) => i !== index);
        setReminders(updatedReminders);
    };

    // Timer functionality
    useEffect(() => {
        let timer;
        if (!isPaused && timeLeft > 0) {
            timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
        } else if (timeLeft === 0) {
            alarmSound.play(); // Play sound when timer is exhausted
           // alert('Time is up!');
            resetTimer();
        }
        return () => clearInterval(timer);
    }, [isPaused, timeLeft]);

    // Check reminders to play sound at the correct time
    useEffect(() => {
        const checkReminders = () => {
            const now = new Date();
            reminders.forEach((reminder) => {
                const [hours, minutes] = reminder.time.split(':').map(Number);
                if (now.getHours() === hours && now.getMinutes() === minutes) {
                    alarmSound.play(); // Play sound when reminder time is reached
                    alert(`Reminder: ${reminder.name}`);
                }
            });
        };
        const interval = setInterval(checkReminders, 60000); // Check every minute
        return () => clearInterval(interval);
    }, [reminders]);

    const startTimer = () => setIsPaused(false);
    const pauseTimer = () => setIsPaused(true);
    const resetTimer = () => {
        setIsPaused(true);
        setTimeLeft(25 * 60);
    };

    const setCustomTimer = () => {
        if (customTime >= 1 && customTime <= 60) setTimeLeft(customTime * 60);
    };

    // Format time for display
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div>
            <Navbar />

            <div className="container">
                {/* Reminders Section */}
                <div className="section">
                    <h2 id ='break-header'>Break and Focus Reminders</h2>
                    <div className="form-group">
                        <input
                            className="input"
                            type="text"
                            placeholder="Reminder Name"
                            value={reminderName}
                            onChange={(e) => setReminderName(e.target.value)}
                        />
                        <input
                            className="input"
                            type="time"
                            value={reminderTime}
                            onChange={(e) => setReminderTime(e.target.value)}
                        />
                        <button onClick={addReminder} className="button">
                            Add Reminder
                        </button>
                    </div>
                    <div className="reminder-list">
                        {reminders.map((reminder, index) => (
                            <div key={index} className="reminder-item">
                                <strong>{reminder.name}</strong>
                                <br />
                                Time: {reminder.time}
                                <br />
                                <button
                                    onClick={() => deleteReminder(index)}
                                    className="button"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pomodoro Timer Section */}
                <div className="section">
                    <h2>Pomodoro Timer</h2>
                    <div className="timer-display">{formatTime(timeLeft)}</div>
                    <div className="timer-controls">
                        <input
                            type="number"
                            placeholder="Min"
                            min="1"
                            max="60"
                            value={customTime}
                            onChange={(e) => setCustomTime(e.target.value)}
                            className="input"
                        />
                        <button onClick={setCustomTimer} className="button">
                            Set Timer
                        </button>
                        <button onClick={startTimer} className="button">
                            Start
                        </button>
                        <button onClick={pauseTimer} className="button">
                            Pause
                        </button>
                        <button onClick={resetTimer} className="button">
                            Reset
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Focus;
