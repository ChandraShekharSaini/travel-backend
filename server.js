import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// Import models
import User from './models/User.js';
import Destination from './models/Destination.js';
import Message from './models/Message.js';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Root route
app.get('/', (req, res) => {
    res.json({ message: "Welcome to Travel Blog API" });
});

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/', {
    dbName: 'travel_blog',
}).then(() => {
    console.log("MongoDB connected successfully!");
    // Initialize destinations if none exist
    initializeDestinations();
}).catch((err) => {
    console.error("MongoDB connection error:", err);
});

// Initialize destinations in the database
async function initializeDestinations() {
    try {
        const count = await Destination.countDocuments();
        if (count === 0) {
            const destinations = [
                {
                    title: 'Kashmir',
                    description: 'Experience the breathtaking views of the Himalayas, houseboats, and rich culture.',
                    imgSrc: '/images/kashmir.jpg',
                },
                {
                    title: 'Varanasi',
                    description: 'Explore the secrets of Kashi and its spiritual charm.',
                    imgSrc: '/images/varanasi.jpg',
                },
                {
                    title: 'Manali',
                    description: 'Let\'s shoot YJHD-2! Pack your bags and explore this trending destination.',
                    imgSrc: '/images/manali.jpg',
                },
                {
                    title: 'Vrindavan',
                    description: 'The place where you learn PREM RAS and experience divine love.',
                    imgSrc: '/images/vrindavan.jpg',
                },
            ];
            await Destination.insertMany(destinations);
            console.log('Destinations initialized successfully!');
        }
    } catch (error) {
        console.error('Error initializing destinations:', error);
    }
}

// Get all destinations
app.get('/destination', async (req, res) => {
    try {
        const destinations = await Destination.find();
        res.json(destinations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// User registration
app.post('/api/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        
        // Create new user
        const newUser = new User({ username, password });
        await newUser.save();
        
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// User login
app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Find user
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        // Check password
        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        
        res.status(200).json({ message: 'Login successful', username: user.username });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all messages
app.get('/api/messages', async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: 1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a new message
app.post('/api/messages', async (req, res) => {
    try {
        const { username, content } = req.body;
        const newMessage = new Message({ username, content });
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a message
app.delete('/api/messages/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Message.findByIdAndDelete(id);
        res.status(200).json({ message: 'Message deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Server setup
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
