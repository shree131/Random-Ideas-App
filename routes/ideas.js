const express = require('express');
const router = express.Router();

const ideas = [
    {
        id: 1,
        text: 'Positive NewsLetter, a newsletter that only shares positive, uplifting news',
        tag: 'Technology',
        username: 'TonyStart',
        date: '2022-01-02'
    },
    {
        id: 2,
        text: 'Milk cartons that change colors as it ages',
        tag: 'Inventions',
        username: 'SteveRogers',
        date: '2022-01-02'
    },
    {
        id: 3,
        text: 'Pet interation app for new pet parents to get to know the right pet for them before they adopt',
        tag: 'Technology',
        username: 'ShreyPan',
        date: '2022-01-02'
    },

]

// Get all ideas
router.get('/', (req, res) => {
    res.json({ success: true, data: ideas });
});

// Get specific ideas using query param ':' to get id requested 
router.get('/:id', (req, res) => {
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

// Add an idea with POST
router.post('/', (req, res) => {

    const idea = {
        id: ideas.length + 1,
        text: req.body.text,
        tag: req.body.tag,
        username: req.body.username,
        date: new Date().toISOString().slice(0, 10)
    };

    ideas.push(idea);
    console.log(idea);
    res.json({
        success: true,
        data: idea,
        message: 'Idea posted on ' + ideas[ideas.length - 1].date
    });
});

// Update requests
router.put('/:id', (req, res) => {
    const idea = ideas.find(ideaObj => ideaObj.id === +req.params.id);

    if (idea.length === 0) {
        return res.status(404).json({ success: false, error: 'Resource not found' });
    }

    // Update Ideas
    idea.text = req.body.text || idea.text;
    idea.tag = req.body.tag || idea.tag;

    res.json({ success: true, data: ideas });

});

// Delete requests
router.delete('/:id', (req, res) => {
    const idea = ideas.find(ideaObj => ideaObj.id === +req.params.id);

    if (!idea) {
        return res.status(404)
            .json({ success: false, error: 'Resource not found' });
    }

    ideas.forEach((ideaObj, index) => {
        if (ideaObj.id === idea.id) {
            ideas.splice(index, 1);
        }
    });

    // const index = ideas.indexOf(idea);
    // ideas.splice(index, 1);

    res.json({ success: true, data: {} });
});


module.exports = router;