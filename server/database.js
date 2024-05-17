const mysql =  require('mysql');
// Connect to the database.
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodemysql'
})

module.exports = db;