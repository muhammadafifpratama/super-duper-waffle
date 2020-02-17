let {MongoClient, ObjectID, url} = require('./mongodb')
let db = require("./mysql")

module.exports = {
    mongodb: {
        MongoClient,
        ObjectID, 
        url
    },
    mysql: {
        db
    }
}