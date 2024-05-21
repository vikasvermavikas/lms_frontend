const db = require('../database');
const Users = require('../models/users');
const jwt = require("jsonwebtoken");


const userlist = (req, res) => {
    const {token} = req.body;
    const JWT_SECRET = 'JWT_SECRET';
    jwt.verify(token, JWT_SECRET, (err, res) => {
        if(err){
            return 'token expired'
        }
    });

    Users.findAll(function (err, results) {
        if (err) {
            res.send(err);
        } else {
            res.send(results);
        }
    })
};

const userdata = (req, res) => {
    const {token} = req.body;

    const user = jwt.verify(token, JWT_SECRET, (err, res) => {
        if(err){
            res.send('token expred');
        }
    });

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
    const {token} = req.body;

    const user = jwt.verify(token, JWT_SECRET, (err, res) => {
        if(err){
            res.send('token expred');
        }
    });

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
    const {token} = req.body;

    const user = jwt.verify(token, JWT_SECRET, (err, res) => {
        if(err){
            res.send('token expred');
        }
    });

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

    const {token} = req.body;

    const user = jwt.verify(token, JWT_SECRET, (err, res) => {
        if(err){
            res.send('token expred');
        }
    });
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

module.exports = {
    userlist,
    userdata,
    update_user,
    delete_user,
    add_user,
    search
};