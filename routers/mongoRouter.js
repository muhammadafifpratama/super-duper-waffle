let express = require('express')
let router = express.Router()

let { mongoController } = require('../controllers')

router.get('/home', mongoController.getgame)

module.exports = router