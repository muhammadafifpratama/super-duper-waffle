const express = require("express")
const {datagame} = require("../controllers")
const router = express.Router();

router.get("/home",datagame.getgame)

module.exports = router