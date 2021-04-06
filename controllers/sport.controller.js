const util = require('../utilities/utility');
const Sports = require('../models/sports.model');

exports.get_all = async function (req, res, next) {
    util.updateSports();
    res.json(await Sports.find());
};