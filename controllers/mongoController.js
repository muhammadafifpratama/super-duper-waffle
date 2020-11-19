const { mongodb } = require("../database")
let url = mongodb.url
let db = mongodb.MongoClient
const crypto = require('crypto')
const { createJWTToken } = require('../helpers/jwt')
const { transporter } = require('../helpers/mailer')
const { panjang } = require("./datacontroller")
const secret = 'kocheng';

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
    register: (req, res) => {
        db.connect(url, (err, cli) => {
            if (err) throw err
            req.body.password = crypto.createHmac('sha256', secret)
                .update(req.body.password)
                .digest('hex'); 1
            var date = new Date()
            var dbo = cli.db("tomato").collection("counters")
            dbo.find({ username: `${req.body.username}` }).toArray(function (err, result) {
                if (err) {
                    res.status(500).send(err)
                }
                if (result.length > 0) {
                    return res.status(500).send({ message: 'username already exist' })
                }
                else {
                    dbo.insertOne({
                        username: `${req.body.username}`,
                        email: `${req.body.email}`,
                        password: `${req.body.password}`,
                        role: "user",
                        saldo: "500000",
                        status: "unverified",
                        tanggal: date
                    },
                        function (err, result) {
                            if (err) {
                                res.status(500).send(err)
                            }
                            cli.close()
                            var mailOption = {
                                from: "Toko",
                                to: req.body.email,
                                subject: "Email Confirmation",
                                html: `Verified your email by clicking this link  
                        <a href="https://muhammadafifpratama-newfinalproject.glitch.me/">Verified</a>`
                            }
                            transporter.sendMail(mailOption, (err, results) => {
                                if (err) {
                                    return res.status(500).send({ message: 'Kirim Email Confirmation Gagal! silahkan cek kembali', err, error: false, email: req.body.email })
                                }
                                res.status(200).send({ status: 'Kirim Email Confirmation berhasil! ', result: results, email: req.body.email })
                            })
                        })
                }
            })
        })
    },
    template: (req, res) => {
        db.connect(url, (err, cli) => {
            if (err) throw err
            var dbo = cli.db("tomato").collection("counters")

        })
    },
    game: (req, res) => {
        var mulai_dari = parseInt(req.body.mulai)
        db.connect(url, (err, cli) => {
            if (err) throw err
            var dbo = cli.db("tugasakhir").collection("datagame")
            dbo.find({ gambar: { $in: [/^https/] } }).skip(mulai_dari).limit(9).toArray(function (err, result) {
                if (err) {
                    res.status(500).send(err)
                }
                cli.close();
                res.status(200).send(result)
            })
        })
    },
    forgot: (req, res) => {
        db.connect(url, (err, cli) => {
            if (err) throw err
            var dbo = cli.db("tomato").collection("counters")

        })
    },
    username: (req, res) => {
        db.connect(url, (err, cli) => {
            if (err) throw err
            var dbo = cli.db("tomato").collection("counters")
            dbo.find({ username: "a" }).toArray(function (err, result) {
                if (err) {
                    res.status(500).send(err)
                }
                if (result.length > 0) {
                    return res.status(500).send({ message: 'username already exist' })
                }
                else {
                    cli.close();
                    res.status(200).send(result)
                }
            })
        })
    },
    login: (req, res) => {
        db.connect(url, (err, cli) => {
            req.body.password = crypto.createHmac('sha256', secret)
                .update(req.body.password)
                .digest('hex');
            if (err) throw err
            var dbo = cli.db("tomato").collection("counters")
            dbo.find({ username: `${req.body.username}`, password: `${req.body.password}` }).toArray(function (err, result) {
                if (err) {
                    res.status(500).send(err)
                }
                if (result.length > 0) {
                    return res.status(200).send(result)
                }
                if (result.length === 0) {
                    return res.status(500).send({ message: 'username or password salah' })
                }
                else {
                    cli.close();
                    res.status(200).send(result)
                }
            })
        })
    },
    carid: (req, res) => {
        db.connect(url, (err, cli) => {
            if (err) throw err
            var dbo = cli.db("tomato").collection("counters")
            dbo.find().toArray(function (err, result) {
                if (err) {
                    res.status(500).send(err)
                }
                // cli.close();
                // res.status(200).send(result[2])
            })
        })
    },
    template: (req, res) => {
        db.connect(url, (err, cli) => {
            if (err) throw err
            var dbo = cli.db("tomato").collection("counters")

        })
    },
}