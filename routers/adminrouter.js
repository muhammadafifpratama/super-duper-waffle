const express = require("express")
const { admin } = require("../controllers")
const router = express.Router();

router.get("/read", admin.read)
router.post('/create', admin.create)

module.exports = router