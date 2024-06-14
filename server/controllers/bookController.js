const books = require('../models/books');

const add_book = (req, res) => {
    const data = req.body;
    books.create(data, function (err, results) {
        if (err) {
            res.send(err);
        } else {
            res.send(results);
        }
    })
};

const read_book = (req, res) => {
    var search = '';
    if (req.params.search) {
        var search = req.params.search;
    }
    // const data = req.body;
    books.read(search, function (err, results) {
        if (err) {
            res.send(err);
        } else {
            res.send(results);
        }
    })
};

const get_book = (req, res) => {
    const bookid = req.params.id;
    // const data = req.body;
    books.find(bookid, function (err, results) {
        if (err) {
            res.send(err);
        } else {
            res.send(results);
        }
    })
};

const update_book = (req, res) => {
    const bookid = req.params.id;
    const data = req.body;
    books.update(data, bookid, function (err, results) {
        if (err) {
            res.send(err);
        } else {
            res.send(results);
        }
    })
};

const delete_book = (req, res) => {
    const bookid = req.params.id;
    // const data = req.body;
    books.delete(bookid, function (err, results) {
        if (err) {
            res.send(err);
        } else {
            res.send(results);
        }
    })
};

const assign_book = (req, res) => {
    const data = req.body;
    books.assign(data, function (err, results) {
        if (err) {
            res.send(err);
        } else {
            res.send(results);
        }
    })
};

const get_book_assignments = (req, res) => {
    var search = '';
    if (req.params.search) {
        var search = req.params.search;
    }
    books.get_book_assignments(search, function (err, results) {
        if (err) {
            res.send(err);
        } else {
            res.send(results);
        }
    })
};

const get_assignment_detail = (req, res) => {
    const assignmentid = req.params.id;
    books.get_assignment_detail(assignmentid, function (err, results) {
        if (err) {
            res.send(err);
        } else {
            res.send(results);
        }
    })
};

const is_assign = (req, res) => {
    const bookid = req.params.id;
    books.is_assign(bookid, function (err, results) {
        if (err) {
            res.send(err);
        } else {
            res.send(results);
        }
    })
};

const book_return = (req, res) => {
    const id = req.params.id;
    books.return_book(id, function (err, results) {
        if (err) {
            res.send(err);
            // console.log(err);
        } else {
            res.send(results);
            // console.log(results);
        }
    })

}

const get_book_stock = (req, res) => {
    var search = '';
    if (req.params.search) {
        var search = req.params.search;
    }
    books.get_stock(search, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    })
} 

const get_total_books = (req, res) => {
    books.get_total_books(function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    })
};
const get_total_assignments = (req, res) => {
    const data = {
        "userid": req.userId,
        "roleid": req.roleId
    };
    books.get_total_assignments(data, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    })
};
const get_total_pending_assign = (req, res) => {
    const data = {
        "userid": req.userId,
        "roleid": req.roleId
    };
    books.get_total_pending_assign(data, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    })
};

const get_book_threshold = (req, res) =>{
    books.get_threshold(function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
};

const update_book_threshold = (req, res) => {
    const data = req.body;
    const userid = req.userId;
    books.update_threshold(data, userid, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
};
module.exports = {
    add_book,
    read_book,
    get_book,
    update_book,
    delete_book,
    assign_book,
    get_book_assignments,
    get_assignment_detail,
    is_assign,
    book_return,
    get_book_stock,
    get_total_books,
    get_total_assignments,
    get_total_pending_assign,
    get_book_threshold,
    update_book_threshold
};