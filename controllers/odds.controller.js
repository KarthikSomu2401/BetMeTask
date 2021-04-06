const util = require('../utilities/utility');
const Fixtutes = require('../models/fixtures.model');
const url = require('url');

exports.get_based_on_query = function (req, res, next) {
    var url_parts = url.parse(req.url, true).query;
    const responseVal = util.updateFixturesAndReturn(url_parts.sport != null ? url_parts.sport : undefined,
        url_parts.region != null ? url_parts.region : undefined,
        url_parts.mkt != null ? url_parts.mkt : undefined, function (response) {
            res.end(response);
        });
    responseVal.then(function (val) {
        res.json(val);
    }).catch(function (err) {
        console.log(err);
    })
};