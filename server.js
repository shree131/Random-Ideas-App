// Bring in express modules
const express = require('express');
const port = 8000;

const ideas = [
    {
        id: 1,
        text: 'Positive NewsLetter, a newsletter that only shares positive, uplifting news',
        tag: 'Technology',
        username: 'TonyStart',
        data: '2022-01-02'
    },
    {
        id: 2,
        text: 'Milk cartons that change colors as it ages',
        tag: 'Inventions',
        username: 'SteveRogers',
        data: '2022-01-02'
    },
    {
        id: 3,
        text: 'Pet interation app for new pet parents to get to know the right pet for them before they adopt',
        tag: 'Technology',
        username: 'ShreyPan',
        data: '2022-01-02'
    },

]

// Initialize a variable (obj) with diff methods for creating server and creating routes
const app = express();

// Simple route - compared to http where there was bunch of if statements
// For get requests - takes a request and response objs
app.get('/', (req, res) => {
    // res.send({ message: 'Welcome to the RandomIdeas API' });

    // Same thing but expects a json response
    res.json({ message: 'Welcome to the RandomIdeas API' });
});

// Restful struture - get idea -> get req; create idea -> create req' post idea -> post req

// Get all ideas
app.get('/api/ideas', (req, res) => {
    res.json({ success: true, data: ideas });
});

// Get specific ideas using query param ':' to get id requested 
app.get('/api/ideas/:id', (req, res) => {
    // Access using req.params.id
    // res.json({ success: true, data: req.params.id });

    // or use find 
    // Manual - easier with Mangose db
    const idea = ideas.filter(ideaObj => ideaObj.id === parseInt(req.params.id));

    if (idea.length === 0) {
        return res.status(404)
            .json({ success: false, error: 'Resource not found' });
    }

    res.json({ success: true, data: idea });
});


// Create the server with listen
app.listen(port, () => console.log(`Listening on port ${port}`));


