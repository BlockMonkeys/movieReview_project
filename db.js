const mysql = require('mysql');

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'hdjy0608',
    database:'movies',
});

db.connect();

module.exports = db;