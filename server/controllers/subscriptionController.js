const Subscription = require('../models/subscription');
class subscriptionController {

    static add_subscription = (req, res) => {
        const data = req.body;
        const creatorid = req.userId;
        Subscription.add(data, creatorid, function (err, result) {
            if (err) {
                res.status(401).send({
                    message: err.message
                });
            } else {
                res.status(200).send({
                    data: result
                });
            }
        })
    };

    static get_all_subscriptions = (req, res) => {
        Subscription.get_all_subscriptions((err, result) => {
            if (err) {
                res.status(401).send({
                    message: err.message
                });
            } else {
                res.status(200).send({
                    data: result
                });
            }
        });
    };

    static get_subscription = (req, res) => {
        const id = req.body.id;
        Subscription.get_subscription(id, (err, result) => {
            if (err) {
                res.status(401).send({
                    message: err.message
                });
            } else {
                res.status(200).send({
                    data: result
                });
            }
        });
    };

    static update_subscription = (req, res) => {
     const data = req.body;
     Subscription.update_subscription(data, (err, result) => {
         if (err) {
            res.status(401).send({
                message: err.message
            });
         } else {
             res.status(200).send({
                 data: result
             });
         }
     });
    };

    static delete_subscription = (req, res) => {
       const id =  req.params.id;
       Subscription.delete_subscription(id, (err, result) => {
        if (err) {
            res.status(401).send({
                message: err.message
            });
        }
        else {
            res.status(200).send({
                data: result
            });
        }
       });
    };
}

module.exports = subscriptionController;