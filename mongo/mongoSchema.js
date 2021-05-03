const mongoose = require ('mongoose');

exports.UserModel = mongoose.model("user",{
    username: { type: String, required: true },
    password: { type: String, required: true }
});