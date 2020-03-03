let mongoRouter = require('./mongoRouter')
let mysql = require("./datagamerouter")
let user = require('./userouter')

module.exports = {
    mongoRouter,
    mysql,
    user
}