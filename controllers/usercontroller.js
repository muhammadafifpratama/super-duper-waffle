const { mysql } = require("../database")
const crypto = require('crypto')
const { createJWTToken } = require('../helpers/jwt')
const { transporter } = require('../helpers/mailer')

const secret = 'teletubies';

module.exports = {
    keepLogin: (req, res) => {
        console.log(req.headers)
        console.log('aaa');

        res.status(200).send({ ...req.user, token: req.token })
    },
    login: (req, res) => {
        var { username, password } = req.body;
        var connection = mysql.db
        password = crypto.createHmac('sha256', secret)
            .update(password)
            .digest('hex');

        var sql = `SELECT * FROM user WHERE username = ${connection.escape(username)}AND password = ${connection.escape(password)};`;

        connection.query(sql, (err, results) => {
            if (err) return res.status(500).send({ err, message: 'Database Error' })

            if (results.length === 0) {
                return res.status(500).send({ message: 'Username or Password Incorrect' })
            }

            var token = createJWTToken({ ...results[0] }, { expiresIn: '1h' })

            res.status(200).send({ ...results[0], token })
        })
    },
    getprofile: (req, res) => {
        var connection = mysql.db
        let sql = `select * from user where username = '${req.params.username}'`
        connection.query(sql, req.body, (err, results) => {
            if (err) {
                res.status(500).send(err)
            }
            res.status(200).send(results)
        });
    },
    getuser: (req, res) => {
        var connection = mysql.db
        // let sql = `select * from finalproject.user where username = '${req.body.username}' && password = '${req.body.password}'`
        let sql = `select username from user where username = '${req.params.username}' && password = '${req.params.password}'`
        connection.query(sql, req.body, (err, results) => {
            if (err) {
                res.status(500).send(err)
            }
            if (results.length === 0) {
                return res.status(500).send({ message: 'username belum terdaftar atau password salah' })
            }
            res.status(200).send(results)
        });
    },
    register: (req, res) => {
        var connection = mysql.db
        req.body.password = crypto.createHmac('sha256', secret)
            .update(req.body.password)
            .digest('hex'); 1
        let sql = `select username from finalproject.user where username = '${req.body.username}'`
        connection.query(sql, req.body, (err, results) => {
            if (err) {
                res.status(500).send(err)
            }
            if (results.length > 0) {
                return res.status(500).send({ message: 'username already exist' })
            }
            sql = `select email from finalproject.user where email = '${req.body.email}'`
            connection.query(sql, req.body, (err, results) => {
                if (err) {
                    return res.status(500).send(err)
                }
                if (results.length > 0) {
                    return res.status(500).send({ message: 'email already exist' })
                }
                sql = 'insert into finalproject.user set ?'
                connection.query(sql, req.body, (err, results) => {
                    if (err) {
                        return res.status(500).send(err)
                    }
                    var mailOption = {
                        from: "Toko",
                        to: req.body.email,
                        subject: "Email Confirmation",
                        html: `Verified your email by clicking this link  
                            <a href="http://localhost:3000/verified?email=${req.body.email}">Verified</a>`
                    }
                    transporter.sendMail(mailOption, (err, results) => {
                        // if (err) {
                        //     return res.status(500).send({ message: 'Kirim Email Confirmation Gagal!', err, error: false, email: req.body.email })
                        // }
                        res.status(200).send({ status: 'Send Email Success', result: results, email: req.body.email })
                    })
                })
            })
        });
    },
    confirmEmail: (req, res) => {
        var connection = mysql.db
        var sql = `UPDATE users SET status='Verified' WHERE email='${req.body.email}';`;
        connection.query(sql, (err, results) => {
            if (err) return res.status(500).send({ status: 'error', err })
            sql = `SELECT id,username,email,status FROM users WHERE email = '${req.body.email}'`;
            sqlDB.query(sql, (err, results) => {
                if (err) return res.status(500).send({ err })

                var token = createJWTToken({ ...results[0] }, { expiresIn: '1h' })

                res.status(200).send({ ...results[0], token })
            })
        })
    },
    resendEmailConfirm: (req, res) => {
        var mailOption = {
            from: "Toko",
            to: req.body.email,
            subject: "Email Confirmation",
            html: `Verified your email by clicking this link  
                <a href="http://localhost:3000/verified?email=${req.body.email}">Verified</a>`
        }

        transporter.sendMail(mailOption, (err, results) => {
            if (err) return res.status(500).send({ message: 'Kirim Email Confirmation Gagal!', err })

            res.status(200).send({ message: 'Send Email Success', result: results })
        })
    },
    getusername: (req, res) => {
        var connection = mysql.db
        let sql = `select username from user`
        connection.query(sql, (err, results) => {
            if (err) {
                res.status(500).send(err)
            }
            res.status(200).send(results)
        });
    },
    getransaction: (req, res) => {
        var connection = mysql.db
        let sql = `select * from transaction where username = '${req.params.id}'`
        connection.query(sql, (err, results) => {
            if (err) {
                res.status(500).send(err)
            }
            res.status(200).send(results)
        });
    },
    getvoucher: (req, res) => {
        var connection = mysql.db
        let sql = `select * from voucher where vouchercol = '${req.body.code}'`
        connection.query(sql, req.body, (err, results) => {
            if (err) {
                res.status(500).send(err)
            }
            res.status(200).send(results)
        });
    },
    updatesaldo: (req, res) => {
        var connection = mysql.db
        let sql = `update finalproject.user set saldo=${req.body.saldo} where username='${req.body.username}'`
        connection.query(sql, req.body, (err, results) => {
            if (err) {
                res.status(500).send(err)
            }
            res.status(200).send(results)
        });
    },
    forgotpassword: (req, res) => {
        var connection = mysql.db
        req.body.password = crypto.createHmac('sha256', secret)
            .update(req.body.password)
            .digest('hex'); 1
        let sql = `update finalproject.user set password='${req.body.password}' where email='${req.params.email}'`
        connection.query(sql, req.body, (err, results) => {
            if (err) {
                res.status(500).send(err)
            }
            res.status(200).send(results)
        });
    },
    setVerified: (req, res) => {
        var connection = mysql.db
        let sql = `update finalproject.user set status='verified' where email='${req.params.email}'`
        connection.query(sql, req.body, (err, results) => {
            if (err) {
                res.status(500).send(err)
            }
            res.status(200).send(results)
        });
    },
    kirimemail: (req, res) => {
        var mailOption = {
            from: "Toko",
            to: req.body.email,
            subject: "Change Password",
            html: `Please click this link to reset your password  
                <a href="http://localhost:3000/password?email=${req.body.email}">Reset Password</a>`
        }
        transporter.sendMail(mailOption, (err, results) => {
            if (err) return res.status(500).send({ message: 'Kirim Email Confirmation Gagal!', err })

            res.status(200).send({ message: 'Send Email Success', result: results })
        })
    },
}