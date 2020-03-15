const { mysql } = require("../database")

module.exports = {
    getprofile: (req, res) => {
        var connection = mysql.db
        let sql = `select username, email from user where username = '${req.params.username}'`
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
                    res.status(200).send(results)
                })
            })
        });
    },
}