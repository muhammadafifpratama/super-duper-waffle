const { mongodb } = require("../database")
let url = mongodb.url
let db = mongodb.MongoClient
const crypto = require('crypto')
const { createJWTToken } = require('../helpers/jwt')
const { transporter } = require('../helpers/mailer')
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
            var dbo = cli.db("tomato").collection("counters")
            dbo.insertOne({
                username: `${req.body.username}`,
                email: `${req.body.email}`,
                password: `${req.body.password}`,
                role: "user",
                saldo: "500000",
                status: "unverified",
                tanggal: Date.now()
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
                            return res.status(500).send({ message: 'Kirim Email Confirmation Gagal!', err, error: false, email: req.body.email })
                        }
                        res.status(200).send({ status: 'Send Email Success', result: results, email: req.body.email })
                    })
                })
        })
    },
    template: (req, res) => {
        db.connect(url, (err, cli) => {
            if (err) throw err
            var dbo = cli.db("tomato").collection("counters")

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
}