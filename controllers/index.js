let mongoController = require('./mongoController')
let datagame = require("./datacontroller")
let user = require('./usercontroller')
let admin = require('./admincontroller')
let cart = require('./cartcontroller')

module.exports = {
    mongoController,
    datagame,
    user,
    admin,
    cart
}