const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    content: [{
        type: String,      
        trim: true
    }]
},

{
    timestamps: true
});

module.exports = mongoose.model('Note', noteSchema);