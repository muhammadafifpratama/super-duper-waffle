const express = require("express")
const { datagame } = require("../controllers")
const router = express.Router();

router.get("/under45/", datagame.getgameunder45)
router.get("/under90", datagame.getgameunder90)
router.get("/notgame", datagame.getnotgame)
router.get("/home/:id", datagame.getgamedetails)
router.get("/featured", datagame.featuredgame)
router.get("/asd", datagame.getmongo)
router.get("/searching/:id", datagame.searching)


module.exports = router