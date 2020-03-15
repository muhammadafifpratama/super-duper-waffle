let mongoRouter = require('./mongoRouter')
let mysql = require("./datagamerouter")
let user = require('./userouter')
let admin = require('./adminrouter')
let cart = require('./cartrouter')

module.exports = {
    mongoRouter,
    mysql,
    user,
    admin,
    cart
}