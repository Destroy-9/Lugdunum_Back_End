const mongoose = require ('mongoose');

exports.UserModel = mongoose.model("user",{
    username: { type: String, required: true },
    password: { type: String, required: true }
});

exports.TimeModel = mongoose.model("time",{
    hour: { type: Number, required: true },
    minute: { type: Number, required: true }
})

exports.LocalizationModel = mongoose.model("localization", {
    lat: { type: Number, required: true },
    long: { type: Number, required: true }
});

