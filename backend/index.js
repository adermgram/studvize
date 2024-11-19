import express, { application } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { PORT, mongodbURL, JWT_SECRET } from './config.js'; // Ensure JWT_SECRET is defined in your config.js
import { User } from './models/userModel.js';

const app = express();
app.use(express.json());
app.use(cors());

// Root endpoint
app.get('/', (req, res) => {
    console.log(req);
    return res.status(200).send('Welcome');
});

// Register a new user
app.post('/users', async (req, res) => {
    try {
        const { name, username, password } = req.body;

        if (!name || !username || !password) {
            return res.status(400).send({
                message: 'Send all required fields: Name, Username, Password',
            });
        }

        // Check if the username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(409).send({ message: 'Username already taken' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            name,
            username,
            password: hashedPassword,
        };

        const user = await User.create(newUser);

        return res.status(201).send({
            message: 'User created successfully',
            user: { id: user._id, name: user.name, username: user.username },
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

// Login endpoint
app.post('/auth/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).send({ message: 'Username and password are required' });
        }

        // Find user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send({ message: 'Invalid password' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, username: user.username },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).send({
            message: 'Login successful',
            token,
            user: { id: user._id, name: user.name, username: user.username },
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});




// Add a new task for a user
app.post('/users/:userId/tasks', async (req, res) => {
    const { userId } = req.params;
    const task = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.tasks.push(task);
        await user.save();

        res.status(201).json(user.tasks);
    } catch (error) {
        res.status(500).json({ error: 'Error adding task' });
    }
});








//Get All Tasks for a // 
app.get('/users/:userId/tasks', async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user.tasks);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching tasks' });
    }
});



app.delete('/users/:userId/tasks/:taskId', async (req, res) => {
    const { userId, taskId } = req.params;

    try {
        console.log("Delete Request - UserId:", userId, "TaskId:", taskId);

        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            console.error("User not found for userId:", userId);
            return res.status(404).json({ error: "User not found" });
        }

        console.log("User found:", user);

        // Remove the task by filtering the tasks array
        const taskIndex = user.tasks.findIndex((task) => task._id.toString() === taskId);
        if (taskIndex === -1) {
            console.error("Task not found for taskId:", taskId);
            return res.status(404).json({ error: "Task not found" });
        }

        console.log("Task to be deleted:", user.tasks[taskIndex]);

        // Use splice to remove the task
        user.tasks.splice(taskIndex, 1);
        await user.save();

        console.log("Task deleted successfully");
        res.json({ message: "Task deleted successfully", tasks: user.tasks });
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ error: "Error deleting task" });
    }
});



//update task completion//
app.put('/users/:userId/tasks/:taskId', async (req, res) => {
    const { userId, taskId } = req.params;
    const updatedTaskData = req.body;

    console.log('validaing upate route',userId, taskId);

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const task = user.tasks.id(taskId);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        Object.assign(task, updatedTaskData);
        await user.save();

        res.json(user.tasks);
    } catch (error) {
        res.status(500).json({ error: 'Error updating task' });
    }
});





// Database connection
mongoose
    .connect(mongodbURL)
    .then(() => {
        console.log('Database connected');
        app.listen(PORT, async () => {
            console.log(`App listening on port: ${PORT}`);
            const indexes = await User.collection.indexes();
            
        });
    })
    .catch((err) => {
        console.log('Database connection error:', err);
    });
