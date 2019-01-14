const express = require("express");
const router = express.Router();
const getFixturesController = require("../controllers/getfixtures");

router.get("/", getFixturesController.get_fixtures);

module.exports = router;
