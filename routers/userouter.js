const express = require("express")
const { user } = require("../controllers")
const router = express.Router();

// router.get("/login", user.getuser)
router.get("/login/:username/:password", user.getuser)
router.get("/profile/:username", user.getprofile)
router.get("/user", user.getusername)
router.get("/transaction/:id", user.getransaction)
router.post('/register', user.register)

module.exports = router