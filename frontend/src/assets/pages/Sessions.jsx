
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import './sessions.css';
import axios from 'axios';
const Sessions = () => {
    const [quote, setQuote] = useState('');
    const [notes, setNotes] = useState('');

    // Fetch random quote
    const getRandomQuote = async () => {
        try {
            const response = await axios.get('https://dummyjson.com/quotes/random');
            return response.data.quote;
        } catch (err) {
            console.error("Error fetching quote:", err);
        }
        return "Stay positive and keep learning!";
    };

    // Update quote state
    const updateQuote = async () => {
        const newQuote = await getRandomQuote();
        setQuote(newQuote);
    };

    // Add bullet point
    const addBullet = () => {
        setNotes((prevNotes) => prevNotes + '\n• ');
    };

    // Clear all notes
    const clearNotes = () => {
        if (window.confirm("Are you sure you want to clear all notes?")) {
            setNotes('');
        }
    };

    
    // Export notes as a text file
    const exportNotes = () => {
        const element = document.createElement('a');
        const file = new Blob([notes], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = 'notes.txt';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    // Calculate word count
    const wordCount = notes.trim().split(/\s+/).filter(word => word).length;

    // Fetch initial quote and set interval for updates
    useEffect(() => {
        updateQuote();
        const quoteInterval = setInterval(updateQuote, 30000);
        return () => clearInterval(quoteInterval);
    }, []);

    return (
        <div className='body'>
            <Navbar />
            <div className='session-container'>
                <h1 className='header'>Interactive Study Session</h1>

                {/* Notes Section */}
                <div className='note-section'>
                    <h2 className='section-title'>Note-Taking</h2>
                    <textarea
                        id="note-text"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Write your notes here..."
                        className='textarea'
                    />
                    <div className="note-controls">
                        <button onClick={addBullet} className='button'>Add Bullet</button>
                        <button onClick={clearNotes} className='button'>Clear Notes</button>
                        
                        <button onClick={exportNotes} className='button'>Export Notes</button>
                    </div>
                    <p className='word-count'>Word Count: {wordCount}</p>
                </div>

                {/* Quote Section */}
                <div className='quote-section'>
                    <h2 className='section-title'>Motivational Quote</h2>
                    <p className='quote-text'>{quote || 'Click "Get Quote" for a motivational quote!'}</p>
                    <button onClick={updateQuote} className='button'>Get Quote</button>
                </div>
            </div>
        </div>
    );
};

export default Sessions;
