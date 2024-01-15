const express = require('express');
const router = express.Router();

// Bring in the schema model
const Idea = require('../models/Idea');

// Get all ideas
router.get('/', async (req, res) => {
    try {
        const ideas = await Idea.find();
        res.json({ success: true, data: ideas });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Something went wrong' });
    }
});

// Get specific ideas using query param ':' to get id requested 
router.get('/:id', async (req, res) => {
    try {
        const idea = await Idea.findById(req.params.id);
        res.json({ success: true, data: idea });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Something went wrong' });
    }
});

// Add an idea with POST
router.post('/', async (req, res) => {

    // Instantiate a new Idea
    const idea = new Idea({
        // Id is auto added in DB
        text: req.body.text,
        tag: req.body.tag,
        username: req.body.username,
        // Default value for date
    });

    // Some methods can be used on instantiated Idea vs model variable
    try {
        const savedIdea = await idea.save();
        res.json({ success: true, data: savedIdea });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Something went wrong' });
    }
});

// Update requests
router.put('/:id', async (req, res) => {
    try {
        const updatedIdea = await Idea.findByIdAndUpdate(req.params.id,
            {
                // Set the fields
                $set: {
                    text: req.body.text,
                    tag: req.body.tag
                }
            },
            // 3rd argument
            { new: true } // If idea doesn't exist with the id, it will create a new idea
        );

        res.json({ success: true, data: updatedIdea });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Something went wrong' });
    }
});

// Delete requests
router.delete('/:id', async (req, res) => {
    try {
        await Idea.findByIdAndDelete(req.params.id);
        res.json({ success: true, data: {} });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Something went wrong' });
    }
});


module.exports = router;