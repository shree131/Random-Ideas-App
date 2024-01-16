// Bring in express modules
const express = require('express');
require('dotenv').config();
const port = process.env.PORT || 5000;

// Bring in connectDB
const connectDB = require('./config/db');

connectDB();

// Initialize a variable (obj) with diff methods for creating server and creating routes
const app = express();

// Static Folder
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));


// Body parser middleware - send raw json to server 
// Very commonly used like this in all api
// Before had to import body parser; express 5 doesn't need it sep
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// allows to access req.body sent

// Simple route - compared to http where there was bunch of if statements
// For get requests - takes a request and response objs
app.get('/', (req, res) => {
    // res.send({ message: 'Welcome to the RandomIdeas API' });

    // Same thing but expects a json response
    res.json({ message: 'Welcome to the RandomIdeas API' });
});

// Restful struture - get idea -> get req; create idea -> create req' post idea -> post req

// Get the router
const ideasRouter = require('./routes/ideas');

// Create middleware - takes endpoint and router
app.use('/api/ideas', ideasRouter);

// Create the server with listen
app.listen(port, () => console.log(`Listening on port ${port}`));


