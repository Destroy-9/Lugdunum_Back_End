const mongoose = require ('mongoose');
const uniqueValidator = require ('mongoose-unique-validator')

const userSchema = mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
    { timestamps: true }
);

const localizationSchema = mongoose.Schema(
    {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
        userId: { type: String, required: true },
    },
    { timestamps: true }
);

userSchema.plugin(uniqueValidator);

exports.UserModel = mongoose.model("user", userSchema);

exports.LocalizationModel = mongoose.model("localization", localizationSchema);

