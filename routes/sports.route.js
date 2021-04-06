const express = require("express");
const router = express.Router();

const sport_controller = require("../controllers/sport.controller");

router.route("/").get(sport_controller.get_all);

module.exports = router;