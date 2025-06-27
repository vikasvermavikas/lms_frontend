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
    this.subscription_days = users.subscription_days;
    this.subscription_amount = users.subscription_amount;
    this.payment_mode = users.payment_mode;
    this.timecreated = Math.floor(Date.now() / 1000);
    this.timeupdated = Math.floor(Date.now() / 1000);
};

Users.create = (data, cb) => {
    const sql = 'INSERT INTO users (username, first_name, last_name, email, gender, mobile, aadhar, status, password, roleid, subscription_days, subscription_amount, subscription_end_date, payment_mode, timecreated, timeupdated) VALUES (?)';
    const password = data.password;
    // Assuming data.subscription_days is an integer like 5
    const subscriptionDays = data.subscription_days;

    // Get the current timestamp in milliseconds
    const currentTimestamp = Date.now();
    // Calculate the subscription duration in milliseconds
    const subscriptionDurationMs = subscriptionDays * 24 * 60 * 60 * 1000;

    // Calculate the end date timestamp in milliseconds
    const endDateTimestampMs = currentTimestamp + subscriptionDurationMs;

    // Convert the result to a Unix timestamp in seconds
    const endDateTimestamp = Math.floor(endDateTimestampMs / 1000);
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
            data.subscription_days,
            data.subscription_amount,
            endDateTimestamp,
            data.payment_mode,
            data.timecreated,
            data.timeupdated,
        ];
        connection.query(sql, [values], (err, result) => {
            if (err) {
                cb(err, null);
            }
            else {
                const year = new Date().getFullYear();
                let month = new Date().getMonth() + 1;
                if (month < 10) {
                    month = "0" + month;
                }

                let insertId = result.insertId;
                if (result.insertId < 10) {
                    insertId = "0" + result.insertId;
                }
                const libraryid = "LMS" + year + month + insertId;
                // Update libary id.
                const updatesql = "UPDATE users SET library_id = '" + libraryid + "' WHERE id = " + result.insertId;
                connection.query(updatesql, (err, updateresult) => {
                    if (err) {
                        cb(err, null);
                    }
                    else {
                        cb(null, result);
                    }
                });
            }
        });
    })
};
Users.findAll = (cb) => {
    connection.query('SELECT id, first_name, last_name, email, username, library_id, subscription_days, timecreated, subscription_end_date FROM users WHERE roleid = 2 ORDER BY id DESC', (err, result) => {
        if (err) {
            cb(err, null);
        }
        cb(null, result);
    });
};

Users.findById = (id, cb) => {
    const sql = 'SELECT id, username, first_name, last_name, email, gender, image, aadhar, mobile, timecreated, library_id, subscription_days, subscription_amount, payment_mode, subscription_end_date FROM users WHERE id =?';
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
    const sql = 'SELECT id, library_id, first_name, last_name, email, subscription_days, timecreated, subscription_end_date FROM users WHERE first_name LIKE ? OR last_name LIKE ? OR email LIKE ?';
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

Users.getTotalUsers = (cb) => {
    const sql = 'SELECT COUNT(id) AS total FROM users';
    connection.query(sql, (err, result) => {
        if (err) {
            cb(err, null);
        }
        cb(null, result);
    });
};

Users.sendotp = (otp, id, cb) => {
    const sql = 'INSERT INTO profile_otp (otp, timecreated, expire_time, userid, expire_status, valid_status) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [
        otp,
        Math.floor(Date.now() / 1000),  // seconds
        Math.floor(Date.now() / 1000) + 300,   // time after 5 minute
        id,
        0,
        0
    ];
    connection.query(sql, values, (err, result) => {
        if (err) {
            cb(err, null);
        }
        else {
            cb(null, result);
        }
    })
};

Users.validateOtp = (data, cb) => {
    const currenttime = Math.floor(Date.now() / 1000);
    const sql = 'SELECT id, expire_time FROM profile_otp WHERE otp = ? AND userid = ? AND id = (SELECT id FROM profile_otp WHERE userid = ? order by id desc limit 1) ORDER BY id DESC LIMIT 1';
    const values = [
        data.otp,
        data.id,
        data.id
    ];
    connection.query(sql, values, (err, result) => {
        if (err) {
            cb(err, null);
        }
        else {
            // If otp time is expired then send expire message.
            if (result.length > 0) {
                if (currenttime > result[0].expire_time) {
                    const expiremessage = [
                        {
                            errormessage: 'OTP Expired'
                        }
                    ];

                    const updatesql = 'UPDATE profile_otp SET expire_status = 1 WHERE id = ' + result[0].id;
                    connection.query(updatesql, (err, updateresult) => {
                        if (updateresult)
                            cb(null, expiremessage);
                    })
                }
                else {
                    const updatesql = 'UPDATE profile_otp SET valid_status = 1 WHERE id = ' + result[0].id;
                    connection.query(updatesql, (err, updateresult) => {
                        if (updateresult)
                            cb(null, result);
                    })
                }
            }
            else {
                cb(null, result);
            }
        }
    })
};

// Get user record by library id.
Users.getallrecord = (data, cb) => {
    const libraryid = data.libraryid;
    const sql = 'SELECT u.id, u.username, u.first_name, u.last_name, u.email, u.gender, u.mobile, u.aadhar, u.library_id, u.timecreated, u.subscription_amount, u.subscription_days, u.payment_mode, u.subscription_end_date FROM users u  WHERE u.library_id =?';
    connection.query(sql, [libraryid], (err, result) => {
        if (err) {
            cb(err, null);
        }
        else {
            if (result.length > 0) {
                const userid = result[0].id;
                const getassignment = 'SELECT ba.class, ba.from_date, ba.to_date, ba.return, ba.return_date, b.serial_number, b.book_name, b.class as category FROM book_assignments ba JOIN books b ON b.id = ba.book_id WHERE ba.userid =?';
                const total_return = 'SELECT COUNT(ba.id) as totalReturn FROM book_assignments ba WHERE ba.return = 1 AND ba.book_id IN (SELECT id FROM books) AND ba.userid = ' + userid;

                connection.query(getassignment, [userid], (err, assignment) => {
                    connection.query(total_return, [], (err, returnbooks) => {
                        const book_returned = returnbooks[0].totalReturn;
                        const alldata = {
                            'userdata': result,
                            'assignment': assignment,
                            'total_returned': book_returned
                        };
                        cb(null, alldata);
                    });


                });
            }
            else {
                cb(null, result);
            }
        }
    });
};
module.exports = Users;

