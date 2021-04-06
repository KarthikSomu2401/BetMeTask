const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SportsSchema = new Schema({
    key: {
        type: String, unique: true, required: true,
    },
    active: {
        type: Boolean, required: true,
    },
    group: {
        type: String, required: true,
    },
    details: {
        type: String,
    },
    title: {
        type: String, required: true,
    },
    has_outrights: {
        type: Boolean,
    }
});

module.exports = mongoose.model("Sports", SportsSchema);