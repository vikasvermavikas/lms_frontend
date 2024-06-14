const db = require('../database');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
// const nodemailer = require('nodemailer');


const secretKey = 'secretkey';

const salt = 10;

const login = (req, res) => {
    const sql = "SELECT * FROM users WHERE `email` =?";
    db.query(sql, [req.body.email], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            if (result.length > 0) {
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
                                roleid: userdata.roleid,
                            }, secretKey, {
                                expiresIn: '1h'
                            }, (err, token) => {
                                return res.json({
                                    status: true,
                                    message: 'Login Success',
                                    data: userdata,
                                    token: token
                                });
                            });
                        } else {
                            return res.json({
                                status: false,
                                message: 'Invalid credentials, please try again',
                            });
                        }
                    }
                });
            }
            else {
                return res.json({
                    status: false,
                    message: 'Invalid credentials, please try again',
                });
            }


        }
    });
};

const usersignup = (req, res) => {
    const sql = 'INSERT INTO users (username, first_name, last_name, email, gender, password, image, status, roleid, timecreated, timeupdated) VALUES (?)';
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
            1,
            Math.floor(Date.now() / 1000),
            Math.floor(Date.now() / 1000),
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
