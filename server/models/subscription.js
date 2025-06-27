const connection = require('../database');
class subscription {

    static add = (data, creatorid, cb) => {
        const checkexistence = 'SELECT id FROM subscriptions WHERE subscription_months = ?';
        connection.query(checkexistence, [data.subscription_months], (err, res) => {
            if (err) {
                cb(err, null);
            }
            else {
                if (res.length > 0) {
                    cb({
                        success : false,
                        message : 'Subscription already exists.',
                    }, null);
                } else {
                    
                    const sql = 'INSERT INTO subscriptions (subscription_months, amount_specify, created_by, timecreated, timeupdated) VALUES (?)';
                    const values = [data.subscription_months, data.amount_specify, creatorid, Math.floor(Date.now() / 1000), Math.floor(Date.now() / 1000)];
                
                   connection.query(sql, [values], (err, result) => {
                    if (err) {
                        cb(err, null);
                    } else {
                        cb(null, result);
                    }
                   })
                }
            }
        })
    };

    static get_all_subscriptions = (cb) => {
        const sql = 'SELECT id, subscription_months, amount_specify FROM subscriptions';
        connection.query(sql, [], function (err, result) {
            if (err) {
                cb({
                    success : false,
                    message : err.message,
                }, null);
            } else {
                cb(null, {
                    success : true,
                    data : result,
                });
            }
        });
     
    };

    static get_subscription = (id, cb) => {
        const sql = 'SELECT id, subscription_months, amount_specify FROM subscriptions WHERE id =?';
        connection.query(sql, [id], function (err, result) {
            if (err) {
                cb({
                    success : false,
                    message : err.message,
                }, null);
            } else {
                cb(null, {
                    success : true,
                    data : result,
                });
            }
        });
    };

    static update_subscription = (data, cb) => {
        const sql = 'UPDATE subscriptions SET amount_specify =?, timeupdated =? WHERE id =?';
        const values = [data.amount_specify, Math.floor(Date.now() / 1000), data.id];
        connection.query(sql, values, function (err, result) {
            if (err) {
                cb({
                    success : false,
                    message : err.message,
                }, null);
            } else {
                cb(null, {
                    success : true,
                    data : result,
                });
            }
        });
    };

    static delete_subscription = (id, cb) => {
        const sql = 'DELETE FROM subscriptions WHERE id =?';
        connection.query(sql, [id], function (err, result) {
            if (err) {
                cb({
                    success : false,
                    message : err.message,
                }, null);
            } else {
                cb(null, {
                    success : true,
                    data : result,
                });
            }
        });
    };
};

module.exports = subscription;