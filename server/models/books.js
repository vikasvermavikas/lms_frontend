const connection = require('../database.js');

class books {

    static create = (data, cb) => {
        const sql = 'INSERT INTO books(serial_number, book_name, publisher_name, class, quantity, price_per_book, publish_year, buying_date, creator_id, timecreated, timeupdated) VALUES (?)';

        for (let index = 0; index < 10; index++) {
            data.serial_number = Date.now() + Math.random().toString(23).substring(2, 5);
            data.timecreated = Math.floor(Date.now() / 1000);
            data.timeupdated = Math.floor(Date.now() / 1000);
            const values = [
                data.serial_number,
                data.book_name,
                data.publisher_name,
                data.class,
                1,
                data.price_per_book,
                data.publish_year,
                data.buying_date,
                data.userid,
                data.timecreated,
                data.timeupdated,
            ];
            connection.query(sql, [values], (err, result) => {
                if (err) {
                    throw err;
                }
            });
        }
        cb(null, 'success');
    }

    static read = (search, cb) => {
        var searchPattern = '';
        var addsql = '';
        if (search) {
            var addsql = 'WHERE serial_number LIKE ? OR book_name LIKE ? OR publisher_name LIKE ?';
            var searchPattern = `%${search}%`;
        }
        const sql = 'SELECT * FROM books ' + addsql + ' ORDER BY id DESC';
        connection.query(sql, [searchPattern, searchPattern, searchPattern], (err, result) => {
            if (err) {
                cb(err, null);
            }
            cb(null, result);
        });
    };

    static find = (id, cb) => {
        const sql = 'SELECT * FROM books WHERE id =?';
        connection.query(sql, [id], (err, result) => {
            if (err) {
                cb(err, null);
            }
            cb(null, result);
        });
    };

    static update = (data, id, cb) => {

        const sql = 'UPDATE books SET `book_name` = ?, `publisher_name` = ?, `class` = ?, `quantity` = ?, `price_per_book` = ?, `publish_year` = ?, `buying_date` = ?, `timeupdated` = ? WHERE id = ?';
        data.timeupdated = Math.floor(Date.now() / 1000);
        const values = [
            data.book_name,
            data.publisher_name,
            data.class,
            data.quantity,
            data.price_per_book,
            data.publish_year,
            data.buying_date,
            data.timeupdated,
            id,
        ];
        connection.query(sql, values, (err, result) => {
            if (err) {
                cb(err, null);
            }
            cb(null, result);
        });
    };

    static delete = (id, cb) => {
        const sql = 'DELETE FROM books WHERE id =?';
        connection.query(sql, [id], (err, result) => {
            if (err) {
                cb(err, null);
            }
            cb(null, result);
        });
    };

    static assign = (data, cb) => {
        const sql = 'INSERT INTO book_assignments (userid, book_id, assigner_id, class, from_date, to_date, timecreated, timeupdated) VALUES (?)';

        data.from_date = (new Date(data.from_date)).getTime();
        data.to_date = (new Date(data.to_date)).getTime();
        data.timecreated = Math.floor(Date.now() / 1000);
        data.timeupdated = Math.floor(Date.now() / 1000);

        const values = [
            data.userid,
            data.book_id,
            data.assigner_id,
            data.class,
            data.from_date,
            data.to_date,
            data.timecreated,
            data.timeupdated,
        ];

        connection.query(sql, [values], (err, result) => {
            if (err) {
                cb(err, null);
            }
            else {
                cb(null, 'success');
            }
        });

    };

    static get_book_assignments = (search, cb) => {
        var searchPattern = '';
        var addsql = '';
        if (search) {
            var addsql = 'WHERE u.first_name LIKE ? OR u.last_name LIKE ? OR b.book_name LIKE ?';
            var searchPattern = `%${search}%`;
        }

        const sql = 'SELECT ba.id, ba.from_date, ba.to_date, CONCAT(u.first_name, " ", u.last_name) as user_name, b.book_name FROM book_assignments ba LEFT JOIN users u ON u.id = ba.userid LEFT JOIN books b ON b.id = ba.book_id ' + addsql + ' ORDER BY ba.id DESC';
        connection.query(sql, [searchPattern, searchPattern, searchPattern], (err, result) => {
            if (err) {
                cb(err, null);
            }
            else {

                cb(null, result);
            }
        });
    };

    static get_assignment_detail = (id, cb) => {

        const sql = 'SELECT ba.id, ba.from_date, ba.to_date, CONCAT(u.first_name, " ", u.last_name) as name, b.book_name, b.serial_number, b.publisher_name, u.email, u.mobile FROM book_assignments ba LEFT JOIN users u ON u.id = ba.userid LEFT JOIN books b ON b.id = ba.book_id WHERE ba.id = ?';
        connection.query(sql, [id], (err, result) => {
            if (err) {
                cb(err, null);
            }
            else {

                cb(null, result);
            }
        });
    };

    static is_assign = (id, cb) => {
        const sql = 'SELECT * FROM book_assignments WHERE book_id =?';
        connection.query(sql, [id], (err, result) => {
            if (err) {
                cb(err, null);
            }
            else {
                if (result && result.length > 0) {
                    if (result[0].return == 0) {
                        cb(null, 'not available');
                    }
                    else {
                        cb(null, 'available');
                    }
                }
                else {
                    cb(null, 'available');
                }
            }

        })
    };

    static return_book = (id, cb) => {
        const sql = 'UPDATE book_assignments SET `return` = ? WHERE id = ?'; 
        const values = [
            1,
            id
        ];
        connection.query(sql, values, (err,result) => {
            if(err){
                cb(err,null);
            }else{
                cb(null,result);
            }
        });
    } 
}

module.exports = books;