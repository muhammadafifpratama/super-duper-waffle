let express = require('express')
let router = express.Router()

let { mongoController } = require('../controllers')

router.get('/home', mongoController.getgame)
router.get('/', mongoController.game)
router.post('/register', mongoController.register)
// router.get('/register', mongoController.register)
router.get('/id', mongoController.carid)
router.get('/username', mongoController.username)
router.post('/login', mongoController.login)

module.exports = router