const books = require('../models/books');

const guestAssignments = async (req, res) => {
    const guestid = req.body.guestid;
    const search = req.params.search;
    books.get_guest_assignments(guestid, search, function (err, results) {
        if (err) {
            res.send(err);
        } else {
            res.send(results);
        }
    })
};

const guestBookView = async (req, res) => {
    const data = req.body;
    books.guest_book_view(data, function (err, results) {
        if (err) {
            res.send(err);
        } else {
            res.send(results);
        }
    });
};

module.exports = {
    guestAssignments,
    guestBookView
};