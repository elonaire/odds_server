const express = require("express");
const router = express.Router();
const getOddsController = require("../controllers/getodds");

router.get("/", getOddsController.getOdds);

module.exports = router;
