let express = require('express')
let router = express.Router()

let { filter } = require('../controllers')

router.get('/tes', filter.getgame)
router.get('/murah', filter.gamemurah)
router.get('/mahal', filter.gamemahal)
router.get('/tipe', filter.notgame)
router.get('/game/:id', filter.detailgame)
router.post('/cart', filter.insert)
router.get('/cart/:username', filter.select)
router.delete('/cart', filter.apus)



module.exports = router