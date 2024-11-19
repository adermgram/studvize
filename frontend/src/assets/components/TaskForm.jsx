// TaskForm.js
import React, { useState } from 'react';

function TaskForm({ addTask }) {
    const [taskName, setTaskName] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('Low');
    const [category, setCategory] = useState('Homework');
    const [description, setDescription] = useState('');

    const handleAddTask = () => {
        if (!taskName.trim()) return;
    
        const newTask = {
            name: taskName,
            dueDate,
            priority,
            category,
             description,
            completed: false
        };

        addTask(newTask);
        setTaskName('');
        setDueDate('');
        setPriority('Low');
        setCategory('Homework');
        setDescription('');
    };

    return (
        <div className="form-group">
            <input 
                type="text" 
                value={taskName} 
                onChange={(e) => setTaskName(e.target.value)} 
                placeholder="Task Name" 
                required 
            /><br />
            <input 
                type="date" 
                value={dueDate} 
                onChange={(e) => setDueDate(e.target.value)} 
            /><br />
            <select 
                value={priority} 
                onChange={(e) => setPriority(e.target.value)}
            >
                <option value="Low">Low Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="High">High Priority</option>
            </select><br />
            <select 
                value={category} 
                onChange={(e) => setCategory(e.target.value)}
            >
                <option value="Homework">Homework</option>
                <option value="Projects">Projects</option>
                <option value="Reading">Reading</option>
            </select><br />
            <textarea 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                placeholder="Optional Description"
            ></textarea><br />
            <button onClick={handleAddTask}>Add Task</button>
        </div>
    );
}

export default TaskForm;
