const connection = require('../database.js');
const bcrypt = require('bcrypt');
const salt = 10;

var Users = function (users) {
    this.username = users.username;
    this.first_name = users.first_name;
    this.last_name = users.last_name;
    this.email = users.email;
    this.gender = users.gender;
    this.mobile = users.mobile;
    this.aadhar = users.aadhar;
    this.password = users.password;
    this.status = 1;
    this.timecreated = Math.floor(Date.now() / 1000);
    this.timeupdated = Math.floor(Date.now() / 1000);
};

Users.create = (data, cb) => {
    const sql = 'INSERT INTO users (username, first_name, last_name, email, gender, mobile, aadhar, status, password, roleid, timecreated, timeupdated) VALUES (?)';
    const password = data.password;
    bcrypt.hash(password.toString(), salt, (err, hash) => {
        const values = [
            data.username,
            data.first_name,
            data.last_name,
            data.email,
            data.gender,
            data.mobile,
            data.aadhar,
            data.status,
            hash,
            2,
            data.timecreated,
            data.timeupdated,
        ];
        connection.query(sql, [values], (err, result) => {
            if (err) {
                cb(err, null);
            }
            else {
                cb(null, result);
            }
        });
    })
};
Users.findAll = (cb) => {
    connection.query('SELECT id, first_name, last_name, email, username FROM users', (err, result) => {
        if (err) {
            cb(err, null);
        }
        cb(null, result);
    });
};

Users.findById = (id, cb) => {
    const sql = 'SELECT id, username, first_name, last_name, email, gender, image, aadhar, mobile FROM users WHERE id =?';
    connection.query(sql, [id], (err, result) => {
        if (err) {
            cb(err, null);
        }
        cb(null, result);
    });
};
Users.update = (data, id, cb) => {
    const sql = 'UPDATE users SET `first_name` = ?, `last_name` = ?, `email` = ? , `gender` = ?, `mobile` = ?, `aadhar` = ? WHERE id =?';

    connection.query(sql, [data.first_name, data.last_name, data.email, data.gender, data.mobile,
    data.aadhar, id], (err, result) => {
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
    const sql = 'SELECT id, first_name, last_name, email FROM users WHERE first_name LIKE ? OR last_name LIKE ? OR email LIKE ?';
    const searchPattern = `%${searchvalue}%`;

    connection.query(sql, [searchPattern, searchPattern, searchPattern], (err, result) => {
        if (err) {
            cb(err, null);
        }
        cb(null, result);
    });
};

Users.findId = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT id, first_name, last_name, email, username FROM users WHERE id =?';
        connection.query(sql, [id], (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });
}
Users.updateProfile = (data, id, file, cb) => {
    let sql = 'UPDATE users SET `first_name` = ?, `last_name` = ?, `email` = ?, `gender` = ?, `mobile` = ?, `aadhar` = ?';
    let values = [
        data.first_name,
        data.last_name,
        data.email,
        data.gender,
        data.mobile,
        data.aadhar,
    ];

    if (file && file.filename) {
        sql += ', `image` = ?';
        values.push(file.filename);
    }

    sql += ' WHERE id = ?';
    values.push(id);

    connection.query(sql, values, (err, result) => {
        if (err) {
            cb(err, null);
        }
        else {

            cb(null, result);
        }
    })
};
module.exports = Users;

