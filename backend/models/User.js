const mongoose = require('mongoose'); //importing mongoose
const { Schema } = mongoose;

//Creating user schema
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});
const User = mongoose.model('user', userSchema);
module.exports = User //mongoose.model need two arguement i.e modelname and schema