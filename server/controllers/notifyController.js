const notify = require('../models/notify');
class notifyController {
    static get_notify = (req, res) => {
        const requestuserid = req.userId;
        notify.get_top_notification(requestuserid, function (err, results) {
            if (err) {
                res.send(err);
            } else {
                res.send(results);
            }
        })
    };

    static get_all_notify = (req, res) => {
        const requestuserid = req.userId;
        notify.get_all_notification(requestuserid, function (err, results) {
            if (err) {
                res.send(err);
            } else {
                res.send(results);
            }
        })
    };

    static get_notify_count = (req, res) => {
        const data = {
            userid: req.userId,
        };
        notify.get_notification_count(data, function (err, results) {
            if (err) {
                res.status(401).send(err);
            } else {
                res.status(200).send(results);
            }
        })
    };
}
module.exports = notifyController;