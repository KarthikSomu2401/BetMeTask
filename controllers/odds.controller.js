const util = require('../utilities/utility');
const Fixtutes = require('../models/fixtures.model');
const url = require('url');

exports.get_based_on_query = function (req, res, next) {
    var url_parts = url.parse(req.url, true).query;
    /* let response = util.updateFixturesAndReturn(url_parts.sport != null ? url_parts.sport : undefined,
        url_parts.region != null ? url_parts.region : undefined,
        url_parts.mkt != null ? url_parts.mkt : undefined); */
    //var respon = undefined;
    util.updateFixturesAndReturn(url_parts.sport != null ? url_parts.sport : undefined,
        url_parts.region != null ? url_parts.region : undefined,
        url_parts.mkt != null ? url_parts.mkt : undefined, function (response) {
            res.end(response);
        });
    //console.log(respon);
    //res.json(respon);
    //util.updateSports();
    //res.json(await Sports.find());
    //https://api.the-odds-api.com/v3/odds/?apiKey=YOUR_API_KEY&sport=soccer_epl&region=uk&mkt=h2h
};