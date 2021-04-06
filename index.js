const express = require('express');
const cors = require("cors");
const cron = require('node-cron');
const envs = require("./configurations");
const util = require('./utilities/utility');
const sports = require('./routes/sports.route');
const odds = require('./routes/odds.route');

const app = express();
app.use(cors());
app.use(cors({ credentials: true, origin: envs.CORS_URL }));
app.use(express.static('public'));
app.use(express.json());

var listener = app.listen(envs.PORT, function () {
    console.log("Listening on port " + listener.address().port);
});

app.use("/sports", sports);
app.use("/odds", odds);

/* listener.on('listening', function () {
    util.updateSports();
    util.updateFixtures();
}); */
const task = cron.schedule('0 0 */1 * * *', () => {
    util.updateNotInPlay();
});
