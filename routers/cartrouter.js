const { cart } = require("../controllers")
const express = require("express")
const router = express.Router();

router.get("/cart/:username", cart.showcart)
// router.post('/cart/:username/:idgame', user.addtocart) 
router.post('/cart/', cart.addtocart)
router.delete('/cart/:id', cart.deletecart)

module.exports = router