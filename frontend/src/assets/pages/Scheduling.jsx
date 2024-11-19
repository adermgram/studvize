import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import TaskForm from '../components/TaskForm';
import TaskTable from '../components/TaskTable';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import './scheduling.css';

function Scheduling() {
    const [tasks, setTasks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decoded = jwtDecode(token);
            setUserId(decoded.id);  // Assuming the userId is part of the token payload
        }
    }, []);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/users/${userId}/tasks`);
                setTasks(response.data);
                
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };
    
        fetchTasks();
    }, [userId]);
    
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);


    const addTask = async (task) => {
        try {
            const response = await axios.post(`http://localhost:5000/users/${userId}/tasks`, task);
            setTasks(response.data);
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };
    

  const deleteTask = async (taskId) => {
    try {
        const response = await axios.delete(`http://localhost:5000/users/${userId}/tasks/${taskId}`);
        console.log(response.data.tasks);
        setTasks(response.data.tasks);
    } catch (error) {
        console.error('Error deleting task:', error);
    }
};


const toggleTaskCompletion = async (task) => {
   
    try {
        const updatedTask = { ...task, completed: !task.completed };
        const response = await axios.put(
            `http://localhost:5000/users/${userId}/tasks/${task._id}`,
            updatedTask
        );
        setTasks(response.data);
    } catch (error) {
        console.error('Error updating task:', error);
    }
};


    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const filteredTasks = tasks.filter(task =>
        task.name.toLowerCase().includes(searchTerm)
    );

    return (
        <div className="app">
            <Navbar />
            <div className="scheduling-container">
                <div className="header">
                    <h1>Study Scheduling</h1>
                </div>
                <div className="search-group">
                    <input 
                        type="text" 
                        placeholder="Search Tasks"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
                <TaskForm addTask={addTask} />
                <TaskTable 
                    tasks={filteredTasks} 
                    toggleTaskCompletion={toggleTaskCompletion} 
                    deleteTask={deleteTask}
                />
            </div>
        </div>
    );
}

export default Scheduling;
