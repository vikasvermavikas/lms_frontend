const connection = require('../database.js');

class books {

    static create = (data, cb) => {
        const sql = 'INSERT INTO books(serial_number, book_name, publisher_name, class, quantity, price_per_book, publish_year, lang, buying_date, creator_id, timecreated, timeupdated) VALUES (?)';

        for (let index = 0; index < data.quantity; index++) {
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
                data.lang,
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
        const sql = 'SELECT id, serial_number, book_name, publisher_name, class, publish_year, availability  FROM books ' + addsql + ' ORDER BY id DESC';
        connection.query(sql, [searchPattern, searchPattern, searchPattern], (err, result) => {
            if (err) {
                cb(err, null);
            }
            cb(null, result);
        });
    };

    static find = (id, cb) => {
        const sql = 'SELECT id, serial_number, book_name, publisher_name, class, publish_year, availability, quantity, price_per_book, buying_date, lang  FROM books WHERE id =?';
        connection.query(sql, [id], (err, result) => {
            if (err) {
                cb(err, null);
            }
            cb(null, result);
        });
    };

    static update = (data, id, cb) => {

        const sql = 'UPDATE books SET `book_name` = ?, `publisher_name` = ?, `class` = ?, `quantity` = ?, `price_per_book` = ?, `publish_year` = ?,`lang` = ?, `buying_date` = ?, `timeupdated` = ? WHERE id = ?';
        data.timeupdated = Math.floor(Date.now() / 1000);
        const values = [
            data.book_name,
            data.publisher_name,
            data.class,
            data.quantity,
            data.price_per_book,
            data.publish_year,
            data.lang,
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
        // First check subscription is end or not.
        const getuser = 'SELECT subscription_days, timecreated FROM users WHERE id = ?';
        connection.query(getuser, [data.userid], (err, usergot) => {
            if (err) {
                cb(err, null);
            }
            else if (usergot.length > 0) {
                const currentdate = Date.now(); // current date in milliseconds.
                const subscription_date = new Date(usergot[0].timecreated * 1000); // subscription date in milliseconds.
                const daysleft = usergot[0].subscription_days - (Math.floor((currentdate - subscription_date) / (1000 * 3600 * 24))) - 1; // days left.

                // Still reader have pending days.
                if (daysleft > 0) {
                    const getbook = 'SELECT book_name, publisher_name, class, publish_year FROM books WHERE id = ?';
                    connection.query(getbook, [data.book_id], (err, result) => {
                        if (err) {
                            cb(err, null);
                        }
                        else {
            
                            data.book_name = result[0].book_name;
                            data.publisher_name = result[0].publisher_name;
                            data.category = result[0].class;
                            data.publish_year = result[0].publish_year;
            
                            const getbookstock = "SELECT total_books.total_count as total_books, COUNT(DISTINCT ba.book_id) as assigned_books FROM books b LEFT JOIN book_assignments ba ON b.id = ba.book_id AND ba.return = 0 JOIN (SELECT book_name, publisher_name, publish_year, class, COUNT(*) as total_count FROM books GROUP BY book_name, publisher_name, publish_year, class) total_books ON b.book_name = total_books.book_name AND b.publisher_name = total_books.publisher_name AND b.publish_year = total_books.publish_year AND b.class = total_books.class WHERE b.book_name = ? AND b.publisher_name = ? AND b.publish_year = ? AND b.class = ? GROUP BY b.class, b.book_name, b.publisher_name, b.publish_year, total_books.total_count";
            
                            connection.query(getbookstock, [data.book_name,
                            data.publisher_name,
                            data.publish_year,
                            data.category], (err, result) => {
                                const totalbooks = result[0].total_books;
                                const assignbooks = result[0].assigned_books;
                                const pendingbooks = totalbooks - assignbooks;
                                const pendingbookpercent = Math.floor((pendingbooks / totalbooks) * 100);
            
                                const getthreshold = 'SELECT threshold_percentage FROM threshold_count';
                                connection.query(getthreshold, (err, result) => {
                                    if (result.length > 0) {
                                        var threshold = result[0].threshold_percentage;
                                    }
                                    else {
                                        var threshold = 30;
                                    }
                                    if (pendingbookpercent < threshold) {
                                        cb(null, {
                                            'status': 'failed',
                                            'error': 'Threshold limit is full'
                                        });
                                    }
                                    else {
                                        const assignsql = 'INSERT INTO book_assignments (userid, book_id, assigner_id, class, from_date, to_date, timecreated, timeupdated) VALUES (?)';
            
                                        data.from_date = (new Date(data.from_date)).getTime(); // convert human readable date to timestamp.
                                        data.to_date = (new Date(data.to_date)).getTime();
                                        data.timecreated = Math.floor(Date.now() / 1000);  // in timestamp format in second.
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
            
                                        connection.query(assignsql, [values], (err, result) => {
                                            if (err) {
                                                cb(err, null);
                                            }
                                            else {
            
                                                const updatesql = "UPDATE books SET availability = 0 WHERE id = " + data.book_id;
                                                connection.query(updatesql, (err, result) => {
                                                    if (result)
                                                        cb(null, 'success');
                                                })
                                            }
                                        });
                                    }
                                })
                            });
                        }
                    });
                }
                else {
                    cb(null, {
                        'status': 'failed',
                        'error': 'Subscription is End.'
                    });
                }

            }
        })
       



    };

    static get_book_assignments = (search, cb) => {
        var searchPattern = '';
        var addsql = '';
        if (search) {
            var addsql = 'WHERE CONCAT( u.first_name, " ", u.last_name) LIKE ? OR b.book_name LIKE ? OR b.serial_number LIKE ?';
            var searchPattern = `%${search}%`;
        }

        const sql = 'SELECT ba.id, ba.from_date, ba.to_date, CONCAT(u.first_name, " ", u.last_name) as user_name, b.book_name, ba.return, b.serial_number FROM book_assignments ba JOIN users u ON u.id = ba.userid JOIN books b ON b.id = ba.book_id ' + addsql + ' ORDER BY ba.id DESC';
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

        const sql = 'SELECT ba.id, ba.from_date, ba.to_date, CONCAT(u.first_name, " ", u.last_name) as name, b.book_name, b.serial_number, b.publisher_name, u.email, u.mobile, ba.return, ba.return_date FROM book_assignments ba LEFT JOIN users u ON u.id = ba.userid LEFT JOIN books b ON b.id = ba.book_id WHERE ba.id = ?';
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
        const sql = 'SELECT * FROM book_assignments WHERE book_id =? ORDER BY id DESC LIMIT 1';
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
        const sql = 'UPDATE book_assignments SET `return` = ?, `return_date` = ? WHERE id = ?';
        const values = [
            1,
            Math.floor(Date.now() / 1000),
            id
        ];

        connection.query(sql, values, (err, result) => {

            if (err) {
                cb(err, null);
            } else {
                const getbookid = 'SELECT book_id FROM book_assignments WHERE id = ?';
                connection.query(getbookid, [id], (err, result) => {
                    if (err) {
                        cb(err, null);
                    } else {
                        const setbook = 'UPDATE books SET availability = 1 WHERE id = ?';
                        connection.query(setbook, [result[0].book_id], (err, result) => {
                            cb(null, result);
                        });
                    }
                });

            }
        });
    }

    static get_stock = (search, cb) => {
        var searchPattern = '';
        var addsql = '';
        if (search) {
            var addsql = ' WHERE b.book_name LIKE ? OR b.publisher_name LIKE ? OR b.publish_year LIKE ? OR b.class LIKE ?';
            var searchPattern = `%${search}%`;
        }

        const sql = "SELECT b.book_name, b.publisher_name, b.publish_year, b.class, total_books.total_count as total_books, COUNT(DISTINCT ba.book_id) as assigned_books FROM books b LEFT JOIN     book_assignments ba ON b.id = ba.book_id AND ba.return = 0 JOIN (SELECT book_name, publisher_name, publish_year, class, COUNT(*) as total_count FROM books GROUP BY book_name, publisher_name, publish_year, class) total_books ON b.book_name = total_books.book_name AND b.publisher_name = total_books.publisher_name AND b.publish_year = total_books.publish_year AND b.class = total_books.class" + addsql + " GROUP BY b.class, b.book_name, b.publisher_name, b.publish_year, total_books.total_count";

        connection.query(sql, [searchPattern, searchPattern, searchPattern, searchPattern], (err, result) => {
            if (err) {
                cb(err, null);
            }
            else {
                cb(null, result);
            }
        });

    }

    static get_guest_assignments = (guestid, search, cb) => {
        let searchvalue = '';
        let addsql = '';

        if (search) {
            searchvalue = `%${search}%`;
            addsql = ' AND (b.book_name LIKE ? OR b.serial_number LIKE ?)';
        }
        const sql = "SELECT b.id, b.serial_number, b.book_name, ba.from_date, ba.to_date, ba.return FROM books b JOIN book_assignments ba ON ba.book_id = b.id WHERE ba.userid = ? " + addsql;
        connection.query(sql, [guestid, searchvalue, searchvalue], (err, result) => {
            if (err) {
                cb(err, null);
            }
            else {
                cb(null, result);
            }
        });
    };

    static guest_book_view = (data, cb) => {

        const sql = "SELECT ba.class, b.publisher_name, b.publish_year, b.serial_number, b.book_name, ba.from_date, ba.to_date, ba.return FROM books b JOIN book_assignments ba ON ba.book_id = b.id WHERE ba.userid = ? AND ba.book_id = ?";
        const queryvalues = [
            data.userid,
            data.bookid.id
        ];
        connection.query(sql, queryvalues, (err, result) => {
            if (err) {
                cb(err, null);
            }
            else {
                cb(null, result);
            }
        });
    };

    static get_total_books = (cb) => {
        const sql = "SELECT COUNT(*) as total_books FROM books GROUP BY book_name, publisher_name, publish_year, class";
        connection.query(sql, (err, result) => {
            if (err) {
                cb(err, null);
            }
            else {
                cb(null, result);
            }
        });
    };

    static get_total_assignments = (data, cb) => {
        var addSql = '';
        if (data.roleid == 2) {
            addSql = 'WHERE userid = ' + data.userid;
        }
        const sql = "SELECT COUNT(*) as total_assignments FROM book_assignments "+addSql;
        connection.query(sql, (err, result) => {
            if (err) {
                cb(err, null);
            }
            else {
                cb(null, result);
            }
        });
    };

    static get_total_pending_assign = (data, cb) => {
        var addSql = '';
        if (data.roleid == 2) {
            addSql = ' AND ba.userid = ' + data.userid;
        }
        const sql = "SELECT COUNT(*) as total_pending_assign FROM book_assignments ba WHERE ba.return = 0 " + addSql;
        connection.query(sql, (err, result) => {
            if (err) {
                cb(err, null);
            }
            else {
                cb(null, result);
            }
        });
    };

    static get_threshold = (cb) => {
        const sql = "SELECT threshold_percentage FROM threshold_count";
        connection.query(sql, (err, result) => {
            if (err) {
                cb(err, null);
            }
            else {
                cb(null, result);
            }
        });
    };

    static update_threshold = (data, userid, cb) => {

        const sql = "SELECT id FROM threshold_count";
        connection.query(sql, (err, result) => {
            if (err) {
                cb(err, null);
            }
            else {
                if (result && result.length > 0) {
                    const sql = "UPDATE threshold_count SET threshold_percentage =?, updated_by = ?, timeupdated = ? WHERE id =?";

                    connection.query(sql, [data.threshold, userid, Math.floor(Date.now() / 1000), result[0].id], (err, result) => {
                        if (err) {
                            cb(err, null);
                        }
                        else {
                            cb(null, result);
                        }
                    });
                }
                else {
                    const sql = "INSERT INTO threshold_count (threshold_percentage, created_by, timecreated, timeupDated) VALUES (?, ?, ?, ?)";
                    connection.query(sql, [data.threshold, userid, Math.floor(Date.now() / 1000), Math.floor(Date.now() / 1000)], (err, result) => {
                        if (err) {
                            cb(err, null);
                        }
                        else {
                            cb(null, result);
                        }
                    });
                }
            }
        })

    };
}
module.exports = books;