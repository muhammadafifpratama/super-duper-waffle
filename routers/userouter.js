const express = require("express")
const { user } = require("../controllers")
const router = express.Router();

router.get("/login", user.getuser)

module.exports = router