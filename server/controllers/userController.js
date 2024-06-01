const Users = require('../models/users');


const userlist = (req, res) => {

    Users.findAll(function (err, results) {
        if (err) {
            res.send(err);
        } else {
            res.send(results);
        }
    })
};

const userdata = (req, res) => {

    const id = req.params.id;
    Users.findById(id, function (err, results) {
        if (err) {
            res.send(err);
        } else {
            res.send(results);
        }
    })
};

const update_user = (req, res) => {
 
    const id = req.params.id;
    let data = new Users(req.body);
    Users.update(data, id, function (err, results) {
        if (err) {
            res.send(err);
        } else {
            res.send(results);
        }
    })
};

const delete_user = (req, res) => {
    const id = req.params.id;
    Users.delete(id, function (err, results) {
        if (err) {
            res.send(err);
        } else {
            res.send(results);
        }
    })
};

const add_user = (req, res) => {
 
    let data = new Users(req.body);

    Users.create(data, function (err, results) {
        if (err) {
            res.send(err);
        } else {
            res.send(results);
        }
    })
};
const search = (req, res) => {
    let searchvalue = req.query.search;

    Users.search(searchvalue, function (err, results) {
        if (err) {
            res.send(err);
        } else {
            res.send(results);
        }
    })
};

const is_valid = async (id) => {
    try {
        const result = await Users.findId(id);
        return result.length > 0 ? true : false;
    } catch (err) {
        return false;
    }
};

const updateprofile = async (req, res) => {
    const id = req.params.id;
    const file = req.file;
    let data = req.body;
    Users.updateProfile(data, id, file, function (err, results) {
        if (err) {
            res.send(err);
        } else {
            res.send(results);
        }
    })
};
module.exports = {
    userlist,
    userdata,
    update_user,
    delete_user,
    add_user,
    search,
    is_valid,
    updateprofile
};