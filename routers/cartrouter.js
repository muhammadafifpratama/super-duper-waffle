const { cart } = require("../controllers")
const express = require("express")
const router = express.Router();

router.get("/cart/:username", cart.showcart)
router.get("/transaction/:id", cart.transactiondetails)
// router.post('/cart/:username/:idgame', user.addtocart) 
router.post('/cart/', cart.addtocart)
router.post('/inventory/', cart.addtoinventory)
router.post('/transaction/', cart.addtotransaction)
router.delete('/cart/:id', cart.deletecart)
router.delete('/transaction/:id', cart.emptycart)
router.get('/inventory/:id/:ofset', cart.getinventory)
router.get('/panjang/:id', cart.banyakdata)


module.exports = router