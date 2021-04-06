const { Timestamp } = require("bson");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const FixturesSchema = new Schema({
    id: {
        type: String, unique: true, required: true,
    },
    sport_key: {
        type: String, required: true,
    },
    sport_nice: {
        type: String, required: true,
    },
    details: {
        type: String,
    },
    teams: [{
        type: String
    }],
    commence_time: {
        type: Date,
    },
    home_team: {
        type: String,
    },
    sites: [{
        site_key: {
            type: String, required: true,
        },
        site_nice: {
            type: String, required: true,
        },
        last_update: {
            type: Date, required: true,
        },
        odds: {
            h2h: [{ type: Number }],
            h2h_lay: [{ type: Number }],
        }
    }],
    sites_count: {
        type: Number,
    }
});

module.exports = mongoose.model("Fixtures", FixturesSchema);