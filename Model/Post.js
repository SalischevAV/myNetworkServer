const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        require: true,
        minlength: 2,
        maxlength: 256,
    },
    body:{
        type: String,
        require: true,
        minlength: 2,
        maxlength: 1600,
    },
    date: { 
        type: Date,
        default: Date.now 
        },
},{versionKey: false});

module.exports = mongoose.model('Post', PostSchema);

