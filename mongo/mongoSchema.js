const mongoose = require ('mongoose');

const userSchema = mongoose.Schema({
    id: { type: String, required: true },
    password: { type: String, required: false },
});

module.exports = mongoose.model('User', userSchema);