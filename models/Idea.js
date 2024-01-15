const mongoose = require('mongoose');

// Instaniate a new Schema instance - takes a field we want schema to include
const IdeaSchema = new mongoose.Schema({
    text: {
        type: String, // Cap is convention for types
        // required: true, // valid
        required: [true, 'Please add a text field'] // backend validations
    },
    tag: {
        type: String
    },
    username: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
});

// Pass name of the model and name of schema
module.exports = mongoose.model('Idea', IdeaSchema);