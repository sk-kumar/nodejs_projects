const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
    name: { type: String, unique: true, required: true }
},{timestaps: true});

module.exports = mongoose.model("category", categorySchema);