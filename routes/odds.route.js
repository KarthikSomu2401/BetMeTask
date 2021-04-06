const express = require("express");
const router = express.Router();

const odds_controller = require("../controllers/odds.controller");

router.route("/").get(odds_controller.get_based_on_query);

module.exports = router;