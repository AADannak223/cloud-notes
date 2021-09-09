const mongoose = require('mongoose'); //importing mongoose
const { Schema } = mongoose;

//Creating user schema
const notesSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, //it's like foreign key
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,

    },
    tag: {
        type: String,
        default: "General"
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('notes', notesSchema)