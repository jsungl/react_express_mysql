var mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '111111',
    database: 'js'
});

connection.connect();

module.exports = connection;

