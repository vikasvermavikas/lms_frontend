const db = require('../database');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const secretKey = 'secretkey';

const salt = 10;

const login = (req, res) => {
    const sql = "SELECT * FROM users WHERE `email` =?";
    db.query(sql, [req.body.email], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            const userdata = result[0];
            bcrypt.compare(req.body.password.toString(), result[0].password, (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    if (result) {
                        req.session.userName = userdata.username;
                        // Generate Token
                        const token = jwt.sign({
                            id: userdata.id,
                            username: userdata.username,
                            email: userdata.email,
                        }, secretKey, {
                            expiresIn: 50
                        }, (err, token) => {
                            return res.json({
                                status: true,
                                message: 'Login Success',
                                data: userdata,
                                token: token
                            });
                        });
                    } else {
                        return false;
                    }
                }
            });


        }
    });
};

const usersignup = (req, res) => {
    const sql = 'INSERT INTO users (username, first_name, last_name, email, gender, password, image, status, timecreated, timeupdated) VALUES (?)';
    const password = req.body.password;
    bcrypt.hash(password.toString(), salt, (err, hash) => {

        const values = [
            req.body.username,
            req.body.first_name,
            req.body.last_name,
            req.body.email,
            req.body.gender,
            hash,
            req.file.filename,
            1,
            Date.now(),
            Date.now(),
        ];

        db.query(sql, [values], (err, result) => {
            if (err) {
                return res.json(err);
            }

            return res.json(result);
        });
    })
};

const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.json(err);
        }
        // console.log('success logout');
        return res.json({
            status: true,
            message: 'Logout Success'
        });
    });
};
module.exports = {
    login,
    usersignup,
    logout
};
