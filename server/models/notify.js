const connection = require('../database');
class notify {
    static get_top_notification = (requestuserid, cb) => {
        const checkuser = 'SELECT roleid FROM users WHERE id = ' + requestuserid;
        connection.query(checkuser, [], (err, result) => {
            if (err) {
                cb(err, null);
            }
            else if (result.length > 0) {
                if (result[0].roleid == 1) {  // it is admin.
                    var addwhere = '';
                }
                else if (result[0].roleid == 2) {  // it is reader.
                    var addwhere = 'AND id =' + requestuserid;
                }

                const currentTimestamp = Date.now();
                const TwoDays = 2 * 24 * 60 * 60 * 1000; // after two days timestamp in milliseconds
                const dateAfterTwodays = Math.floor((currentTimestamp + TwoDays) / 1000);
                const sql = 'SELECT CONCAT(first_name, " ", last_name) as name, id FROM users WHERE roleid = 2 ' + addwhere + ' AND subscription_end_date BETWEEN ' + Math.floor(currentTimestamp / 1000) + ' AND ' + dateAfterTwodays + ' ORDER BY id DESC LIMIT 4';

                connection.query(sql, (err, result) => {
                    if (err) {
                        cb(err, null);
                    }
                    else {
                        cb(null, result);
                    }
                });
            }
        });
    };

    static get_all_notification = (requestuserid, cb) => {
        const checkuser = 'SELECT roleid FROM users WHERE id = ' + requestuserid;
        connection.query(checkuser, [], (err, result) => {
            if (err) {
                cb(err, null);
            }
            else if (result.length > 0) {
                if (result[0].roleid == 1) {  // it is admin.
                    var addwhere = '';
                }
                else if (result[0].roleid == 2) {  // it is reader.
                    var addwhere = 'AND id =' + requestuserid;
                }

                const currentTimestamp = Date.now();
                const TwoDays = 2 * 24 * 60 * 60 * 1000; // after two days timestamp in milliseconds
                const dateAfterTwodays = Math.floor((currentTimestamp + TwoDays) / 1000);
                const sql = 'SELECT CONCAT(first_name, " ", last_name) as name, id, library_id, subscription_end_date FROM users WHERE roleid = 2 ' + addwhere + ' AND subscription_end_date BETWEEN ' + Math.floor(currentTimestamp / 1000) + ' AND ' + dateAfterTwodays + ' ';
                connection.query(sql, (err, result) => {
                    if (err) {
                        cb(err, null);
                    }
                    else {
                        cb(null, result);
                    }
                });
            }
        });
    };
};
module.exports = notify;