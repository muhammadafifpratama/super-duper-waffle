const express = require("express")
const { user } = require("../controllers")
const router = express.Router();
const { auth } = require('../helpers/auth')

// router.get("/login", user.getuser)
router.get("/login/:username/:password", user.getuser)
router.get("/profile/:username", user.getprofile)
router.get("/user", user.getusername)
router.get("/transaction/:id", user.getransaction)
router.post('/register', user.register)
router.patch('/saldo', user.updatesaldo)
router.patch('/forgot/:email', user.forgotpassword)
router.patch('/verified/:email', user.setVerified)
router.post('/confirmemail', user.confirmEmail)
router.post('/resendemailconfirm', user.resendEmailConfirm)
router.post('/keeplogin', auth, user.keepLogin)
router.post('/login', user.login)
router.post('/kirimemail', user.kirimemail)


module.exports = router