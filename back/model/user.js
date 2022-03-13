const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstname: { type: String, default: null },
    lastname: { type: String, default: null },
    email: { type: String, unique: true },
    password: { type: String },
    birthdate: { type: Date, default: null },
    created_at: { type: Date, default: (new Date().toISOString().slice(0, 19).replace('T', ' '))},
    updated_at: { type: Date, default: (new Date().toISOString().slice(0, 19).replace('T', ' '))},
    token: { type: String }
});

module.exports = mongoose.model("user", userSchema);