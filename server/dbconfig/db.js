require("dotenv").config();
var mysql = require('mysql');
const connection = mysql.createConnection({
    host: process.env.DATABASE_HOST || '',
    user: process.env.DATABASE_USER || '',
    password: process.env.DATABASE_PASSWORD || '',
    database: process.env.DATABASE_NAME || '',
    multipleStatements:true
});

connection.connect();

module.exports = connection;

