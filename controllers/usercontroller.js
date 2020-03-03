const { mysql } = require("../database")

module.exports = {
    getuser: (req, res) => {
        var connection = mysql.db
        // console.log(req.query);
        // console.log(connection);
        let sql = "select * from user"
        connection.query(sql, (err, results) => {
            if (err) {
                res.status(500).send(err)
            }
            res.status(200).send(results)
        });
    }
}