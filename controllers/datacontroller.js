const { mysql, mongodb } = require("../database")
const axios = require('axios');
const db = mongodb.MongoClient
const account = mongodb.url
module.exports = {
    getgameunder45: (req, res) => {
        var connection = mysql.db
        let sql = `select * from finalproject.gamedata where tipe="game" && harga<45000 LIMIT 5;`
        connection.query(sql, (err, results) => {
            if (err) {
                res.status(500).send(err)
            }
            res.status(200).send(results)
        });
    },
    getgameunder90: (req, res) => {
        var connection = mysql.db
        let sql = 'select * from finalproject.gamedata where tipe="game" && harga<90000 && harga>45000 LIMIT 6;'
        connection.query(sql, (err, results) => {
            if (err) {
                res.status(500).send(err)
            }
            res.status(200).send(results)
        });
    },
    getnotgame: (req, res) => {
        var connection = mysql.db
        let sql = 'SELECT * FROM finalproject.gamedata where tipe <> "game";'
        connection.query(sql, (err, results) => {
            if (err) {
                res.status(500).send(err)
            }
            res.status(200).send(results)
        });
    },
    getgamedetails: (req, res) => {
        var connection = mysql.db
        let sql = `SELECT * FROM finalproject.gamedata where id=${req.params.id};`
        connection.query(sql, (err, results) => {
            if (err) {
                res.status(500).send(err)
            }
            res.status(200).send(results)
        });
    },
    featuredgame: async (req, res) => {
        let response = await axios.get("http://store.steampowered.com/api/featured/")
        // console.log(response.data);
        res.send(response.data)
    },
    getmongo: async (req, res) => {
        await db.connect(account, (error, results) => {
            if (error) throw error
            var data = results.db("tugasakhir").collection("ngetes")
            data.find().toArray(function (err, response) {
                if (err) throw err;
                results.close();
                res.send(response)
                // console.log(result[0][283811].data.name);
            })
        })
    },
    searching: (req, res) => {
        var connection = mysql.db
        let sql = `select * from finalproject.gamedata where nama like '%${req.params.id}%'`
        connection.query(sql, (err, results) => {
            if (err) {
                res.status(500).send(err)
            }
            res.status(200).send(results)
        });
    }
}