const { mysql } = require("../database")
module.exports = {
    create: (req, res) => {
        var connection = mysql.db
        let sql = `select * from finalproject.gamedata where nama = ${req.body.name}`
        connection.query(sql, req.body, (err, results) => {
            if (err) {
                res.status(500).send(err)
            }
            console.log(results);
            res.status(200).send(results)
            // if (results.length > 0) {
            //     return res.status(500).send({ message: 'Product name already exist!' })
            // }

            // query = `INSERT INTO finalproject.gamedata SET ? ;`

            // connection.query(query, req.body, (err, results) => {
            //     if (err) {
            //         return res.status(500).send(err)
            //     }

            //     res.status(200).send(results)
            // })
        });
    },
    read: (req, res) => {
        var connection = mysql.db
        let sql = 'select * from finalproject.gamedata'
        connection.query(sql, (err, results) => {
            if (err) {
                res.status(500).send(err)
            }
            res.status(200).send(results)
        });
    }
}