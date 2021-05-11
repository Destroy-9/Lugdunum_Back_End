const mongoose = require ('mongoose');

exports.UserModel = mongoose.model("user",{
    username: { type: String, required: true },
    password: { type: String, required: true }
});

exports.TimeModel = mongoose.model("time",{
    hour: { type: Number, required: true },
    minutes: { type: Number, required: true }
});

exports.LocalizationModel = mongoose.model("localization", {
    lat: { type: Number, required: true },
    long: { type: Number, required: true },
    userId: { type: String, require: true },
    timeId: { type: String, require: true }
});

