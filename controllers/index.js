let mongoController = require('./mongoController')
let datagame = require("./datacontroller")
let user = require('./usercontroller')
let admin = require('./admincontroller')
let cart = require('./cartcontroller')
let filter = require('./gamesfilter')

module.exports = {
    mongoController,
    datagame,
    user,
    admin,
    cart,
    filter
}