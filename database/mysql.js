const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'afif',
    password: 'asd123',
    database: 'finalproject',
    port: 3306
});

module.exports = db;