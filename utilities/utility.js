const cron = require('node-cron');
const request = require('request');
const envs = require("../configurations");
const db = require("../database");
const Sports = require('../models/sports.model');
const Fixtures = require('../models/fixtures.model');

function updateSports() {
    request(`${envs.ODDS_API_URL_BASE}/v3/sports?apiKey=${envs.ODDS_API_KEY}`, function (error, response, body) {
        let sportsData = JSON.parse(body);
        if (response.statusCode === 200 && sportsData.success) {
            console.log("Data is getting stored!!");
            sportsData.data.map((sport) => {
                let submitSport = new Sports({
                    key: sport.key,
                    active: sport.active,
                    group: sport.group,
                    details: sport.details,
                    title: sport.title,
                    has_outrights: sport.has_outrights
                });
                submitSport
                    .save()
                    .then(() => { })
                    .catch((err) => { });
            });
        }
    });
}

function updateFixtures(sportName = "upcoming", region = "uk", market = "h2h") {
    request(`${envs.ODDS_API_URL_BASE}/v3/odds/?sport=${sportName}&region=${region}&mkt=${market}&apiKey=${envs.ODDS_API_KEY}`, function (error, response, body) {
        let fixturesData = JSON.parse(body);
        if (response.statusCode === 200 && fixturesData.success) {
            console.log("Data is getting stored!!");
            fixturesData.data.map((fix) => {
                let submitFixture = new Fixtures({
                    id: fix.id,
                    sport_key: fix.sport_key,
                    sport_nice: fix.sport_nice,
                    details: fix.details,
                    teams: fix.teams,
                    commence_time: fix.commence_time,
                    home_team: fix.home_team,
                    sites: fix.sites,
                    sites_count: fix.sites_count
                });
                submitFixture
                    .save()
                    .then(() => { })
                    .catch((err) => { });
            });
        }
    });
}
function updateFixturesAndReturn(sportName = "upcoming", region = "uk", market = "h2h") {
    return new Promise(function (resolve, reject) {
        request(`${envs.ODDS_API_URL_BASE}/v3/odds/?sport=${sportName}&region=${region}&mkt=${market}&apiKey=${envs.ODDS_API_KEY}`, function (error, response, body) {
            let fixturesData = JSON.parse(body);
            if (response.statusCode === 200 && fixturesData.success) {
                console.log("Data is getting stored!!");
                fixturesData.data.map((fix) => {
                    let submitFixture = new Fixtures({
                        id: fix.id,
                        sport_key: fix.sport_key,
                        sport_nice: fix.sport_nice,
                        details: fix.details,
                        teams: fix.teams,
                        commence_time: fix.commence_time,
                        home_team: fix.home_team,
                        sites: fix.sites,
                        sites_count: fix.sites_count
                    });
                    submitFixture
                        .save()
                        .then(() => { })
                        .catch((err) => { });
                });
                resolve(fixturesData.data);
            }
            else {
                reject(response);
            }
        });
    });
}

async function updateNotInPlay() {
    let notInPlay = await Sports.find();
    notInPlay.map((sport) => {
        updateFixtures(sport.key);
    })
}

module.exports = {
    updateSports,
    updateFixtures,
    updateNotInPlay,
    updateFixturesAndReturn
}