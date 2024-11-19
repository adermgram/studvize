import React from 'react';

function TaskTable({ tasks, toggleTaskCompletion, deleteTask }) {
    return (
        <table className="task-table">
            <thead>
                <tr>
                    <th>Task Name</th>
                    <th>Due Date</th>
                    <th>Priority</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {tasks.map((task) => (
                    <tr key={task._id}
                    className={`${task.completed ? 'task-completed' : ''} ${
                        task.priority === 'Low' ? 'low-priority' :
                        task.priority === 'Medium' ? 'medium-priority' : 'high-priority'
                    }`}
                    >
                        <td>{task.name}</td>
                        <td>{new Date(task.dueDate).toLocaleDateString()}</td>
                        <td>{task.priority}</td>
                        <td>{task.category}</td>
                        <td>{task.description || 'N/A'}</td>
                       
                        <td>{task.completed ? "Completed" : "Pending"}</td>
                        <td>
                        <button 
                                className={task.completed ? 'undo-btn' : 'complete-btn'} 
                                onClick={() => toggleTaskCompletion(task)}
                                >
                                {task.completed ? 'Undo' : 'Complete'}
                            </button>
                            <button 
                                className="delete-btn" 
                                onClick={() => deleteTask(task._id)}
                            >
                                Delete
                            </button>

                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default TaskTable;
