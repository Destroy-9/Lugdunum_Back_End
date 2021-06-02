const mongoose = require ('mongoose');

const userSchema = mongoose.Schema(
    {
        username: { type: String, required: true },
        password: { type: String, required: true },
    },
    { timestamps: true }
);

const localizationSchema = mongoose.Schema(
    {
        lat: { type: Number, required: true },
        long: { type: Number, required: true },
        userId: { type: String, required: true },
    },
    { timestamps: true }
);


exports.UserModel = mongoose.model("user", userSchema);

exports.LocalizationModel = mongoose.model("localization", localizationSchema);

