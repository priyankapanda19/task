
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    Title: {
        type: String,
        required: true,
        trim: true
    },
    Body: {
        type: String,
        required: true,
        trim: true,
        
    },
    CreatedBy: {
        type: String,
        required: true,
        trim: true,
    },
    Status: {
        type: String,
        enum: ["Active","Inactive"],
        required: true,
    },
    GeoLocation:{
        type: String,
        required: true,
        trim: true,
    }
}, { timestamps: true });


module.exports = mongoose.model('Post', postSchema);