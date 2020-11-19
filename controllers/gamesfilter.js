const { mongodb } = require("../database")
let url = mongodb.url
let db = mongodb.MongoClient

module.exports = {
    getgame: (req, res) => {
        db.connect(url, (err, client) => {
            if (err) throw err;
            var dbo = client.db("tugasakhir").collection("tampung")
            dbo.find().toArray(function (err, result) {
                if (err) {
                    res.status(500).send(err)
                }
                client.close();
                res.status(200).send(result[0][283811].data.name)
                console.log(result[0][283811].data.name);
            })
        })
    },
    gamemurah: (req, res) => {
        var id = req.body.id
        db.connect(url, (err, cli) => {
            if (err) throw err
            var dbo = cli.db("tomato").collection("game")
            dbo.find({ harga: { $lt: 45000 } }).toArray(function (err, result) {
                if (err) {
                    res.status(500).send(err)
                }
                cli.close();
                res.status(200).send(result)
            })
        })
    },
    gamemahal: (req, res) => {
        db.connect(url, (err, cli) => {
            if (err) throw err
            var dbo = cli.db("tomato").collection("game")
            dbo.find({ harga: { $lt: 90000, $gt: 45000 } }).toArray(function (err, result) {
                if (err) {
                    res.status(500).send(err)
                }
                cli.close();
                res.status(200).send(result)
            })
        })
    },
    notgame: (req, res) => {
        db.connect(url, (err, cli) => {
            if (err) throw err
            var dbo = cli.db("tomato").collection("game")
            dbo.find({ tipe: { $ne: "game" } }).toArray(function (err, result) {
                if (err) {
                    res.status(500).send(err)
                }
                cli.close();
                res.status(200).send(result)
            })
        })
    },
    detailgame: (req, res) => {
        var id = parseInt(req.params.id)
        db.connect(url, (err, cli) => {
            if (err) throw err
            var dbo = cli.db("tomato").collection("game")
            dbo.find({ id: id }).toArray(function (err, result) {
                if (err) {
                    res.status(500).send(err)
                }
                cli.close();
                res.status(200).send(result)
            })
        })
    },
    template: (req, res) => {
        db.connect(url, (err, cli) => {
            if (err) throw err
            var dbo = cli.db("tomato").collection("cart")
            dbo.insertOne({
                username: `${req.body.username}`,
                game: `${req.body.game}`,
                harga: `${req.body.harga}`,
            },
                function (err, result) {
                    if (err) {
                        res.status(500).send(err)
                    }
                    cli.close()
                    res.status(200).send(result)
                })
        })
    },
    insert: (req, res) => {
        db.connect(url, (err, cli) => {
            if (err) throw err
            var dbo = cli.db("tomato").collection("cart")
            dbo.insertOne({
                username: `${req.body.username}`,
                game: `${req.body.game}`,
                harga: `${req.body.harga}`,
            },
                function (err, result) {
                    if (err) {
                        res.status(500).send(err)
                    }
                    cli.close()
                    res.status(200).send(result)
                })
        })
    },
    select: (req, res) => {
        db.connect(url, (err, cli) => {
            if (err) throw err
            var dbo = cli.db("tomato").collection("cart")
            dbo.find({ username: `${req.params.username}`, }).toArray(function (err, result) {
                if (err) {
                    res.status(500).send(err)
                }
                cli.close();
                res.status(200).send(result)
            })
        })
    },
    apus: (req, res) => {
        db.connect(url, (err, cli) => {
            if (err) throw err
            var dbo = cli.db("tomato").collection("cart")
            dbo.deleteOne({
                username: `${req.body.username}`,
                game: `${req.body.game}`,
                harga: `${req.body.harga}`,
            },
                function (err, result) {
                    if (err) {
                        res.status(500).send(err)
                    }
                    cli.close()
                    res.status(200).send(result)
                })
        })
    },
    kosong:(req,res) => {
        db.connect(url)
    }
}