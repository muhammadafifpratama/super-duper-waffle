const { mysql } = require("../database")
module.exports = {
    addtocart: (req, res) => {
        var connection = mysql.db
        let sql = 'insert into cart set ?'
        // let sql = `insert into finalproject.cart (username,idgame)values ('${req.params.username}','${req.params.idgame}')`
        connection.query(sql, req.body, (err, results) => {
            if (err) {
                return res.status(500).send(err)
            }
            res.status(200).send(results)
        })
    },
    showcart: (req, res) => {
        var connection = mysql.db
        let sql = `select * from cart where username = '${req.params.username}'`
        // let sql = `insert into finalproject.cart (username,idgame)values ('${req.params.username}','${req.params.idgame}')`
        connection.query(sql, (err, results) => {
            if (err) {
                return res.status(500).send(err)
            }
            res.status(200).send(results)
        })
    },
    deletecart: (req, res) => {
        var connection = mysql.db
        let sql = `delete from cart where idcart= '${req.params.id}'`
        connection.query(sql, (err, results) => {
            if (err) {
                return res.status(500).send(err)
            }
            res.status(200).send(results)
        })
    },
    emptycart: (req, res) => {
        var connection = mysql.db
        let sql = `delete from cart where username= '${req.params.id}'`
        connection.query(sql, (err, results) => {
            if (err) {
                return res.status(500).send(err)
            }
            res.status(200).send(results)
        })
    },
    addtoinventory: (req, res) => {
        var connection = mysql.db
        let sql = 'insert into transaction set ?'
        connection.query(sql, req.body, (err, results) => {
            if (err) {
                return res.status(500).send(err)
            }
            res.status(200).send(results)
        })
    },
    addtotransaction: (req, res) => {
        var connection = mysql.db
        let sql = 'insert into transactiondetail set ?'
        connection.query(sql, req.body, (err, results) => {
            if (err) {
                return res.status(500).send(err)
            }
            res.status(200).send(results)
        })
    },
    transactiondetails: (req, res) => {
        var connection = mysql.db
        let sql = `select idtransaction from transaction where transactiondate= '${req.params.id}'`
        connection.query(sql, (err, results) => {
            if (err) {
                return res.status(500).send(err)
            }
            res.status(200).send(results)
        })
    },
    getinventory: (req, res) => {
        var connection = mysql.db
        let sql = `select * from transactiondetail where username = '${req.params.id}' limit 10 offset ${req.params.ofset}`
        connection.query(sql, (err, results) => {
            if (err) {
                return res.status(500).send(err)
            }
            res.status(200).send(results)
        })
    },
    banyakdata: (req, res) => {
        var connection = mysql.db
        let sql = `select count(namagame) as panjang from transactiondetail where username = '${req.params.id}'`
        connection.query(sql, (err, results) => {
            if (err) {
                return res.status(500).send(err)
            }
            res.status(200).send(results)
        })
    },
}