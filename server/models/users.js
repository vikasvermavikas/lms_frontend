const connection = require('../database.js');

var Users = function (users) {
    this.username = users.username;
    this.first_name = users.first_name;
    this.last_name = users.last_name;
    this.email = users.email;
    this.gender = users.gender;
};

Users.create = (data, cb) => {
    const sql = 'INSERT INTO users (username, first_name, last_name, email, gender) VALUES (?)';
    const values = [
        data.username,
        data.first_name,
        data.last_name,
        data.email,
        data.gender
    ];
    connection.query(sql, [values], (err, result) => {
        if (err) {
            cb(err, null);
        }
        cb(null, result);
    });
};
Users.findAll = (cb) => {
    connection.query('SELECT * FROM users', (err, result) => {
        if (err) {
            cb(err, null);
        }
        cb(null, result);
    });
};

Users.findById = (id, cb) => {
    const sql = 'SELECT * FROM users WHERE id =?';
    connection.query(sql, [id], (err, result) => {
        if (err) {
            cb(err, null);
        }
        cb(null, result);
    });
};
Users.update = (data, id, cb) => {
    const sql = 'UPDATE users SET `first_name` = ?, `last_name` = ?, `email` = ? , `gender` = ? WHERE id =?';

    connection.query(sql, [data.first_name, data.last_name, data.email, data.gender, id], (err, result) => {
        if (err) {
            cb(err, null);
        }
        cb(null, result);
    });
};
Users.delete = (id, cb) => {
    const sql = 'DELETE FROM users WHERE id =?';
    connection.query(sql, [id], (err, result) => {
        if (err) {
            cb(err, null);
        }
        cb(null, result);
    });
};


Users.search = (searchvalue, cb) => {
    const sql = 'SELECT * FROM users WHERE first_name LIKE ? OR last_name LIKE ? OR email LIKE ?';
    const searchPattern = `%${searchvalue}%`;

    connection.query(sql, [searchPattern, searchPattern, searchPattern], (err, result) => {
        if (err) {
            cb(err, null);
        }
        cb(null, result);
    });
};
module.exports = Users;

