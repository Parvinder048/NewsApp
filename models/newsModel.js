const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        default: 'Anonymous'
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    imageUrl: {
        type: String
    },
    tags: [{
        type: String
    }]
});

module.exports = mongoose.model('News', newsSchema);